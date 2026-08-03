import { Customer } from '@models/Customer';
import type { CreateCustomerInput, UpdateCustomerInput } from '@validation/customer.validation';

export interface CustomerListFilters {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

function buildFilterQuery({ search, status }: CustomerListFilters) {
  const query: Record<string, unknown> = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    const pattern = new RegExp(search.trim(), 'i');
    query.$or = [
      { shopName: pattern },
      { ownerName: pattern },
      { phone: pattern },
      { area: pattern },
    ];
  }

  return query;
}

export const customerRepository = {
  findAll: (filters: CustomerListFilters, page: number, limit: number) =>
    Customer.find(buildFilterQuery(filters))
      .sort({ shopName: 1 })
      .skip((page - 1) * limit)
      .limit(limit),

  count: (filters: CustomerListFilters) => Customer.countDocuments(buildFilterQuery(filters)),

  findById: (id: string) => Customer.findById(id),

  create: (data: CreateCustomerInput) => Customer.create(data),

  update: (id: string, data: UpdateCustomerInput) =>
    Customer.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }),

  getSummaryStats: async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalCustomers,
      activeCustomers,
      todaysNewCustomers,
      pendingCustomers,
      outstandingAgg,
      topCustomer,
    ] = await Promise.all([
      Customer.countDocuments(),
      Customer.countDocuments({ status: 'ACTIVE' }),
      Customer.countDocuments({ createdAt: { $gte: startOfToday } }),
      Customer.countDocuments({ outstanding: { $gt: 0 } }),
      Customer.aggregate<{ total: number }>([
        { $group: { _id: null, total: { $sum: '$outstanding' } } },
      ]),
      Customer.findOne().sort({ totalPurchase: -1, shopName: 1 }),
    ]);

    return {
      totalCustomers,
      activeCustomers,
      todaysNewCustomers,
      pendingCustomers,
      totalOutstanding: outstandingAgg[0]?.total ?? 0,
      topCustomer: topCustomer
        ? { name: topCustomer.shopName, totalPurchase: topCustomer.totalPurchase }
        : null,
    };
  },

  /**
   * Applies a bill to a customer's running totals and returns the
   * outstanding balance before/after so the caller can write matching
   * ledger entries.
   */
  applySale: async (
    customerId: string,
    billAmount: number,
    amountReceived: number,
    billDate: Date,
  ) => {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const previousOutstanding = customer.outstanding;

    customer.totalPurchase += billAmount;
    customer.totalPaid += amountReceived;
    customer.lastBillDate = billDate;

    await customer.save();

    return { customer, previousOutstanding, newOutstanding: customer.outstanding };
  },

  /** Remembers the selling price used for a product so future bills pre-fill it. */
  saveProductPrice: (customerId: string, productId: string, price: number) =>
    Customer.updateOne(
      { _id: customerId, 'productPrices.product': productId },
      { $set: { 'productPrices.$.price': price } },
    ).then(async (result) => {
      if (result.matchedCount === 0) {
        await Customer.updateOne(
          { _id: customerId },
          { $push: { productPrices: { product: productId, price } } },
        );
      }
    }),
};
