import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { I18nextProviderProps, initReactI18next } from "react-i18next";
await i18next
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init<I18nextProviderProps>({
    detection: {
      order: [
        "htmlTag",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
    },
    debug: false,
    load: "languageOnly",
    ns: ["input", "common", "home"],
    defaultNS: "common",
    supportedLngs: ["en", "es"],
    fallbackLng: "es",
    saveMissing: false,
    missingKeyHandler(lngs, ns, key, fallbackValue, updateMissing, options) {
      console.log("Missing key:", key);
    },
  });
i18next.services.formatter?.add("lowercase", (value, lng, options) => {
  return value.toLowerCase();
});
export default i18next;
