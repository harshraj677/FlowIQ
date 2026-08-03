/**
 * Domain types are intentionally minimal in Phase 1 — only an identity shape
 * so stores/services can be wired up. Full schemas land with each module's
 * business logic in later phases.
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer extends BaseEntity {
  name: string;
}

export interface StockItem extends BaseEntity {
  name: string;
}

export interface Bill extends BaseEntity {
  billNumber: string;
}

export interface Collection extends BaseEntity {
  amount: number;
}

export interface Transport extends BaseEntity {
  transporterName: string;
}

export interface Expense extends BaseEntity {
  description: string;
}
