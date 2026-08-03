import { create } from 'zustand';

export interface DashboardSummary {
  totalStockValue: number;
  totalSalesThisMonth: number;
  totalPurchaseThisMonth: number;
  totalProfitThisMonth: number;
}

interface DashboardState {
  summary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  setSummary: (summary: DashboardSummary | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  summary: null,
  isLoading: false,
  error: null,
  setSummary: (summary) => set({ summary }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
