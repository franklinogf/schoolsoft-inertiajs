import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../../../lang/en.json";
i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "es",
  resources: {
    en: {
      translation: enTranslations,
    },
  },
});
