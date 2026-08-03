import { Purchase } from '@models/Purchase';

export const purchaseRepository = {
  create: (data: {
    supplier: string;
    purchaseDate: Date;
    invoiceNumber?: string;
    transportExpense: number;
    remarks?: string;
    totalQuantity: number;
    totalAmount: number;
    createdBy: string;
  }) => Purchase.create(data),

  findAll: (limit: number, skip: number) =>
    Purchase.find()
      .sort({ purchaseDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('supplier', 'name'),

  count: () => Purchase.countDocuments(),

  findById: (id: string) => Purchase.findById(id).populate('supplier', 'name'),

  /** Aggregate stats used by the dashboard summary endpoint. */
  getPurchaseStats: async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

    const [todayStats] = await Purchase.aggregate<{ amount: number; count: number }>([
      { $match: { purchaseDate: { $gte: startOfToday } } },
      { $group: { _id: null, amount: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
    ]);

    const [monthStats] = await Purchase.aggregate<{ amount: number }>([
      { $match: { purchaseDate: { $gte: startOfMonth } } },
      { $group: { _id: null, amount: { $sum: '$totalAmount' } } },
    ]);

    return {
      todaysPurchaseAmount: todayStats?.amount ?? 0,
      todaysPurchaseCount: todayStats?.count ?? 0,
      monthPurchaseCost: monthStats?.amount ?? 0,
    };
  },
};
