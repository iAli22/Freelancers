import i18n from "i18next";
import Languagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import arTranslation from "./locales/ar/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n
  .use(Languagedetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    whitelist: ["ar", "en"],
    // lng: "ar",
    fallbackLng: "ar",
    detection: {
      order: [
        "cookie",
        "localStorage",
        "htmlTag",
        "querystring",
        "path",
        "subdomain",
      ],
      cache: "cookie",
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
