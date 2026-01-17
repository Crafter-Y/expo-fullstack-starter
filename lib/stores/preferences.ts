import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { colorScheme } from "nativewind";
import { Platform } from "react-native";
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
      language: getDeviceLanguage(),
      theme: "system",

      setLanguage: (language) => {
        set({ language });
        if (i18n.language !== language) {
          // eslint-disable-next-line import/no-named-as-default-member
          i18n.changeLanguage(language);
        }
      },
      setTheme: (theme) => {
        set({ theme });
        // Update NativeWind color scheme
        if (Platform.OS === "web" && theme === "system") {
          // On web, when system mode is selected, check actual system preference
          const isDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          colorScheme.set(isDark ? "dark" : "light");
        } else {
          colorScheme.set(theme);
        }
      },
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.language && i18n.language !== state.language) {
          // eslint-disable-next-line import/no-named-as-default-member
          i18n.changeLanguage(state.language);
        }

        if (state?.theme) {
          if (Platform.OS === "web" && state.theme === "system") {
            // On web, when system mode is selected, check actual system preference
            const isDark = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            colorScheme.set(isDark ? "dark" : "light");
          } else {
            colorScheme.set(state.theme);
          }
        }
      },
    }
  )
);
