import { Invoice } from '@models/Invoice';
import type { INVOICE_STATUSES, PAYMENT_MODES } from '@models/Invoice';

export interface InvoiceListFilters {
  customerId?: string;
  status?: (typeof INVOICE_STATUSES)[number];
}

export interface CreateInvoiceData {
  invoiceNumber: string;
  customer: string;
  invoiceDate: Date;
  transportExpense: number;
  remarks?: string;
  paymentMode: (typeof PAYMENT_MODES)[number];
  amountReceived: number;
  totalQuantity: number;
  totalAmount: number;
  outstanding: number;
  status: (typeof INVOICE_STATUSES)[number];
  grossProfit: number;
  netProfit: number;
  createdBy: string;
}

function buildFilterQuery(filters: InvoiceListFilters) {
  const query: Record<string, unknown> = {};
  if (filters.customerId) query.customer = filters.customerId;
  if (filters.status) query.status = filters.status;
  return query;
}

export const invoiceRepository = {
  create: (data: CreateInvoiceData) => Invoice.create(data),

  findAll: (filters: InvoiceListFilters, page: number, limit: number) =>
    Invoice.find(buildFilterQuery(filters))
      .sort({ invoiceDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('customer', 'shopName phone'),

  count: (filters: InvoiceListFilters) => Invoice.countDocuments(buildFilterQuery(filters)),

  findById: (id: string) => Invoice.findById(id).populate('customer', 'shopName phone'),

  /** Aggregate stats used by the dashboard summary endpoint. */
  getSalesStats: async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

    const [todayStats] = await Invoice.aggregate<{ amount: number; count: number }>([
      { $match: { invoiceDate: { $gte: startOfToday } } },
      { $group: { _id: null, amount: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    ]);

    const [monthStats] = await Invoice.aggregate<{ netProfit: number }>([
      { $match: { invoiceDate: { $gte: startOfMonth } } },
      { $group: { _id: null, netProfit: { $sum: '$netProfit' } } },
    ]);

    return {
      todaysSalesAmount: todayStats?.amount ?? 0,
      todaysBillsCount: todayStats?.count ?? 0,
      monthNetProfit: monthStats?.netProfit ?? 0,
    };
  },
};
