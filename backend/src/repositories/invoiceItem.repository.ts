import { InvoiceItem } from '@models/InvoiceItem';

export const invoiceItemRepository = {
  create: (data: {
    invoice: string;
    product: string;
    quantity: number;
    sellingPrice: number;
    purchasePriceSnapshot: number;
    amount: number;
    profit: number;
  }) => InvoiceItem.create(data),

  findByInvoiceId: (invoiceId: string) =>
    InvoiceItem.find({ invoice: invoiceId }).populate('product', 'name'),
};
