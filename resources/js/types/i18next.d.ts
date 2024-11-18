import "i18next";
import common from "../../../public/locales/es/common.json";
import home from "../../../public/locales/es/home.json";
import input from "../../../public/locales/es/input.json";
import pages from "../../../public/locales/es/pages.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "common";
    // custom resources type
    resources: {
      common: typeof common;
      input: typeof input;
      pages: typeof pages;
      home: typeof home;
    };
    // other
  }
}
