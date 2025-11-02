import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import de from "@/locales/de/translation.json";
import en from "@/locales/en/translation.json";

// Get device locale
const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";

// Determine initial language (English default, German if device is German)
const initialLanguage = deviceLanguage === "de" ? "de" : "en";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    de: {
      translation: de,
    },
  },
  lng: initialLanguage, // default language
  fallbackLng: "en", // fallback language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  compatibilityJSON: "v4", // required for i18next v21+
});

export default i18n;
