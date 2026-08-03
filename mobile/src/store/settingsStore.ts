import { create } from 'zustand';

export interface BusinessProfile {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
}

interface SettingsState {
  businessProfile: BusinessProfile | null;
  setBusinessProfile: (profile: BusinessProfile | null) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  businessProfile: null,
  setBusinessProfile: (businessProfile) => set({ businessProfile }),
}));
