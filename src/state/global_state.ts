import { AppStorage } from "@/storage/app_storate";
import { create } from "zustand";

interface UseGlobalState {
  tokenUser?: string;
  phoneNumber?: string;
  isLoading: boolean;
  accountData: object;
  updateTokenUser: (token: string) => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateAccountData: (data: object) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const useGlobalState = create<UseGlobalState>((set) => ({
  tokenUser: undefined,
  phoneNumber: undefined,
  isLoading: false,
  accountData: {},
  updateTokenUser: async (token: string) => {
    await AppStorage.saveTokenUser(token);
    set({ tokenUser: token });
  },
  updatePhoneNumber: async (phoneNumber: string) => {
    await AppStorage.savePhoneNumber(phoneNumber ?? "");
    set({ phoneNumber: phoneNumber });
  },
  updateAccountData: (data: object) => set({ accountData: data }),
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));

export default useGlobalState;
