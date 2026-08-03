/**
 * Domain types are fleshed out module-by-module as business logic lands.
 * Stock/Purchase (Phase 2) are fully modeled; the rest stay minimal identity
 * shapes until their phase.
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductStatus = 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface Product extends BaseEntity {
  name: string;
  currentStock: number;
  purchasePrice: number;
  averagePurchasePrice: number;
  lastPurchaseDate: string | null;
  totalPurchased: number;
  totalSold: number;
  sellingPrice: number | null;
  lowStockLimit: number;
  stockValue: number;
  status: ProductStatus;
}

export interface Supplier extends BaseEntity {
  name: string;
  phone: string | null;
  address: string | null;
  isDefault: boolean;
}

export interface PurchaseItem {
  id: string;
  product: { id: string; name: string } | string;
  quantity: number;
  purchasePrice: number;
  amount: number;
}

export interface Purchase extends BaseEntity {
  supplier: { id: string; name: string } | string;
  purchaseDate: string;
  invoiceNumber: string | null;
  transportExpense: number;
  remarks: string | null;
  totalQuantity: number;
  totalAmount: number;
  createdBy: string;
  items?: PurchaseItem[];
}

export type StockMovementType = 'PURCHASE' | 'SALE' | 'ADJUSTMENT';

export interface StockMovement extends BaseEntity {
  product: { id: string; name: string } | string;
  type: StockMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  remarks: string | null;
  createdBy: string;
}

export interface DashboardSummary {
  totalStockQuantity: number;
  totalStockValue: number;
  todaysPurchaseAmount: number;
  todaysPurchaseCount: number;
  monthPurchaseCost: number;
}

export type CustomerStatus = 'ACTIVE' | 'INACTIVE';

export interface Customer extends BaseEntity {
  shopName: string;
  ownerName: string | null;
  phone: string;
  address: string | null;
  area: string | null;
  notes: string | null;
  status: CustomerStatus;
  totalPurchase: number;
  totalPaid: number;
  outstanding: number;
  lastBillDate: string | null;
}

export type CustomerLedgerType = 'INVOICE' | 'COLLECTION' | 'ADJUSTMENT';

export interface CustomerLedgerEntry extends BaseEntity {
  customer: { id: string; shopName: string } | string;
  type: CustomerLedgerType;
  amount: number;
  previousOutstanding: number;
  newOutstanding: number;
  remarks: string | null;
  createdBy: string;
}

export interface CustomerSummary {
  totalCustomers: number;
  activeCustomers: number;
  todaysNewCustomers: number;
  pendingCustomers: number;
  totalOutstanding: number;
  topCustomer: { name: string; totalPurchase: number } | null;
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
