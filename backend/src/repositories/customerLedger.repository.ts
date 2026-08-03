import { CustomerLedger, type CUSTOMER_LEDGER_TYPES } from '@models/CustomerLedger';

export const customerLedgerRepository = {
  findByCustomer: (customerId: string, limit: number) =>
    CustomerLedger.find({ customer: customerId }).sort({ createdAt: -1 }).limit(limit),

  create: (data: {
    customer: string;
    type: (typeof CUSTOMER_LEDGER_TYPES)[number];
    amount: number;
    previousOutstanding: number;
    newOutstanding: number;
    referenceType?: string;
    referenceId?: string;
    remarks?: string;
    createdBy: string;
  }) => CustomerLedger.create(data),
};
