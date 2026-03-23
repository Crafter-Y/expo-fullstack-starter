import { usePreferencesStore } from "../stores/preferences";

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
