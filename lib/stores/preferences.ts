import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Language = "en" | "de";
type Theme = "light" | "dark" | "system";

interface PreferencesState {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
}

// Get device language for initial default
const getDeviceLanguage = (): Language => {
  const deviceLang = Localization.getLocales()[0]?.languageCode || "en";
  return deviceLang === "de" ? "de" : "en";
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      // Default to device language (will be overridden by persisted values if they exist)
      language: getDeviceLanguage(),
      theme: "system",

      // Actions
      setLanguage: (language) => {
        set({ language });
        // Update i18n when language changes
        if (i18n.language !== language) {
          // eslint-disable-next-line import/no-named-as-default-member
          i18n.changeLanguage(language);
        }
      },
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "preferences-storage", // unique name for AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // After rehydration, sync i18n with the loaded language
        if (state?.language && i18n.language !== state.language) {
          // eslint-disable-next-line import/no-named-as-default-member
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);
