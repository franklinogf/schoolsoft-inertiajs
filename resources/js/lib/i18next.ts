import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import esCommon from "@/locales/es/common.json";
import esHome from "@/locales/es/home.json";
import i18next from "i18next";
import { I18nextProviderProps, initReactI18next } from "react-i18next";
i18next
  .use(initReactI18next)

  .init<I18nextProviderProps>({
    ns: ["home", "common"],
    defaultNS: "common",
    lng: "en",
    fallbackLng: "es",
    debug: true,
    saveMissing: true,
    resources: {
      en: {
        home: enHome,
        common: enCommon,
      },
      es: {
        home: esHome,
        common: esCommon,
      },
    },
    missingKeyHandler(lngs, ns, key, fallbackValue, updateMissing, options) {
      console.log("Missing key:", key);
    },
  });
export default i18next;
