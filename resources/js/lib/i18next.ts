import i18next from "i18next";
import Backend from "i18next-http-backend";
import { I18nextProviderProps, initReactI18next } from "react-i18next";
i18next
  .use(initReactI18next)
  .use(Backend)
  .init<I18nextProviderProps>({
    ns: ["common", "home"],
    defaultNS: "common",
    lng: "en",
    fallbackLng: "es",
    saveMissing: false,
    missingKeyHandler(lngs, ns, key, fallbackValue, updateMissing, options) {
      console.log("Missing key:", key);
    },
  });
export default i18next;
