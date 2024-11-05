import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../../../lang/en.json";
import esTranslations from "../../../lang/es.json";
i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "es",
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },

  saveMissing: true,
  missingKeyHandler(lngs, ns, key, fallbackValue, updateMissing, options) {
    console.log("Missing key:", key, lngs);
  },
});
