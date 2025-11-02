import { usePreferencesStore } from "../stores/preferences";

/**
 * Custom hook for language management
 * Use this hook in components that need to change the language
 *
 * How it works:
 * 1. Zustand loads persisted language from AsyncStorage automatically
 * 2. The store's setLanguage() updates both Zustand (persisted) and i18n (runtime)
 * 3. No manual syncing needed!
 */
export function useLanguage() {
  const language = usePreferencesStore((state) => state.language);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);

  const changeLanguage = (newLanguage: "en" | "de") => {
    setLanguage(newLanguage); // This updates both store and i18n
  };

  return {
    language,
    changeLanguage,
    toggleLanguage: () => {
      const newLanguage = language === "en" ? "de" : "en";
      changeLanguage(newLanguage);
    },
  };
}
