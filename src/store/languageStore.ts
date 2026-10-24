import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

interface LanguageState {
  selectedLanguage: LanguageCode | null;
  // True once the saved value has been read from AsyncStorage, so routing never reacts to an empty default.
  hydrated: boolean;
  selectLanguage: (code: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hydrated: false,
      selectLanguage: (code) => set({ selectedLanguage: code }),
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => AsyncStorage),
      // Only the chosen language is saved, not the hydration flag.
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => () => {
        useLanguageStore.setState({ hydrated: true });
      },
    },
  ),
);
