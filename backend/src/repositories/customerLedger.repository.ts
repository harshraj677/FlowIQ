import { CustomerLedger } from '@models/CustomerLedger';

export const customerLedgerRepository = {
  findByCustomer: (customerId: string, limit: number) =>
    CustomerLedger.find({ customer: customerId }).sort({ createdAt: -1 }).limit(limit),
};
