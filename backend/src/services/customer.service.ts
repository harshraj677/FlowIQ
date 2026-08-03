import { AppError } from '@middleware/errorHandler';
import {
  customerLedgerRepository,
  customerRepository,
  type CustomerListFilters,
} from '@/repositories';
import type { CreateCustomerInput, UpdateCustomerInput } from '@validation/customer.validation';

export const customerService = {
  listCustomers: async (filters: CustomerListFilters, page: number, limit: number) => {
    const [customers, total] = await Promise.all([
      customerRepository.findAll(filters, page, limit),
      customerRepository.count(filters),
    ]);

    return { customers, total, page, limit };
  },

  getCustomerDetail: async (id: string) => {
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }
    return customer;
  },

  createCustomer: (input: CreateCustomerInput) => customerRepository.create(input),

  updateCustomer: async (id: string, input: UpdateCustomerInput) => {
    const customer = await customerRepository.update(id, input);
    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }
    return customer;
  },

  getSummary: () => customerRepository.getSummaryStats(),

  getLedger: async (customerId: string, limit = 50) => {
    const customer = await customerRepository.findById(customerId);
    if (!customer) {
      throw new AppError(404, 'Customer not found');
    }
    return customerLedgerRepository.findByCustomer(customerId, limit);
  },
};
