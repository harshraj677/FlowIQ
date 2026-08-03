import { SYSTEM_ACTOR } from '@config/constants';
import { AppError } from '@middleware/errorHandler';
import { getNextSequence } from '@models/Counter';
import type { INVOICE_STATUSES } from '@models/Invoice';
import {
  customerLedgerRepository,
  customerRepository,
  invoiceItemRepository,
  invoiceRepository,
  productRepository,
  stockMovementRepository,
} from '@/repositories';
import type { CreateInvoiceInput } from '@validation/invoice.validation';

async function generateInvoiceNumber(): Promise<string> {
  const seq = await getNextSequence('invoice');
  return `INV-${String(seq).padStart(4, '0')}`;
}

export const invoiceService = {
  createInvoice: async (input: CreateInvoiceInput) => {
    const customer = await customerRepository.findById(input.customerId);
    if (!customer) {
      throw new AppError(400, 'Selected customer does not exist');
    }

    const products = await Promise.all(
      input.items.map(async (item) => {
        const product = await productRepository.findById(item.productId);
        if (!product) {
          throw new AppError(400, 'One of the selected products does not exist');
        }
        if (product.currentStock < item.quantity) {
          throw new AppError(
            400,
            `Not enough stock for ${product.name}. Available: ${product.currentStock} pcs`,
          );
        }
        return { item, product };
      }),
    );

    const invoiceDate = input.invoiceDate ?? new Date();

    const computedItems = products.map(({ item, product }) => {
      const amount = Math.round(item.quantity * item.sellingPrice * 100) / 100;
      const profit =
        Math.round((item.sellingPrice - product.purchasePrice) * item.quantity * 100) / 100;
      return {
        productId: item.productId,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
        purchasePriceSnapshot: product.purchasePrice,
        amount,
        profit,
      };
    });

    const totalQuantity = computedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = computedItems.reduce((sum, item) => sum + item.amount, 0);
    const grossProfit = computedItems.reduce((sum, item) => sum + item.profit, 0);
    const netProfit = Math.round((grossProfit - input.transportExpense) * 100) / 100;

    const outstanding = Math.max(0, totalAmount - input.amountReceived);
    const status: (typeof INVOICE_STATUSES)[number] =
      input.amountReceived <= 0
        ? 'PENDING'
        : input.amountReceived >= totalAmount
          ? 'PAID'
          : 'PARTIAL';

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await invoiceRepository.create({
      invoiceNumber,
      customer: input.customerId,
      invoiceDate,
      transportExpense: input.transportExpense,
      remarks: input.remarks,
      paymentMode: input.paymentMode,
      amountReceived: input.amountReceived,
      totalQuantity,
      totalAmount,
      outstanding,
      status,
      grossProfit,
      netProfit,
      createdBy: SYSTEM_ACTOR,
    });

    const items = await Promise.all(
      computedItems.map((item) =>
        invoiceItemRepository.create({
          invoice: String(invoice._id),
          product: item.productId,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
          purchasePriceSnapshot: item.purchasePriceSnapshot,
          amount: item.amount,
          profit: item.profit,
        }),
      ),
    );

    for (const item of computedItems) {
      const { previousStock, newStock } = await productRepository.applySale(
        item.productId,
        item.quantity,
      );
      await stockMovementRepository.create({
        product: item.productId,
        type: 'SALE',
        quantity: -item.quantity,
        previousStock,
        newStock,
        referenceType: 'SALE',
        referenceId: String(invoice._id),
        createdBy: SYSTEM_ACTOR,
      });
    }

    const { previousOutstanding, newOutstanding } = await customerRepository.applySale(
      input.customerId,
      totalAmount,
      input.amountReceived,
      invoiceDate,
    );

    const afterInvoiceOutstanding = previousOutstanding + totalAmount;

    await customerLedgerRepository.create({
      customer: input.customerId,
      type: 'INVOICE',
      amount: totalAmount,
      previousOutstanding,
      newOutstanding: afterInvoiceOutstanding,
      referenceType: 'INVOICE',
      referenceId: String(invoice._id),
      remarks: `Bill ${invoiceNumber}`,
      createdBy: SYSTEM_ACTOR,
    });

    if (input.amountReceived > 0) {
      await customerLedgerRepository.create({
        customer: input.customerId,
        type: 'COLLECTION',
        amount: input.amountReceived,
        previousOutstanding: afterInvoiceOutstanding,
        newOutstanding,
        referenceType: 'INVOICE',
        referenceId: String(invoice._id),
        remarks: `Payment for ${invoiceNumber}`,
        createdBy: SYSTEM_ACTOR,
      });
    }

    if (input.saveCustomerPrices) {
      await Promise.all(
        computedItems.map((item) =>
          customerRepository.saveProductPrice(input.customerId, item.productId, item.sellingPrice),
        ),
      );
    }

    return { invoice, items };
  },

  listInvoices: async (
    filters: { customerId?: string; status?: (typeof INVOICE_STATUSES)[number] },
    page: number,
    limit: number,
  ) => {
    const [invoices, total] = await Promise.all([
      invoiceRepository.findAll(filters, page, limit),
      invoiceRepository.count(filters),
    ]);

    const withItems = await Promise.all(
      invoices.map(async (invoice) => ({
        ...invoice.toJSON(),
        items: await invoiceItemRepository.findByInvoiceId(String(invoice._id)),
      })),
    );

    return { invoices: withItems, total, page, limit };
  },

  getInvoiceById: async (id: string) => {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) {
      throw new AppError(404, 'Invoice not found');
    }
    const items = await invoiceItemRepository.findByInvoiceId(id);
    return { ...invoice.toJSON(), items };
  },
};
