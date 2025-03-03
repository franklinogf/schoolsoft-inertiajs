import { useLaravelReactI18n } from "laravel-react-i18n";
import translations from "../../../lang/es.json";
// import otherTranslations from "../../../lang/php_es.json";

type JsonTranslations = keyof typeof translations;
// type OtherTranslations = keyof typeof otherTranslations;

export type Translations = JsonTranslations;
export function useTranslations() {
  const { t, setLocale, currentLocale, tChoice, loading, getLocales, isLocale } =
    useLaravelReactI18n<Translations>();

  return { t, setLocale, currentLocale, tChoice, loading, getLocales, isLocale };
}
