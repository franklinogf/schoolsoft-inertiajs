import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { LaravelReactI18nProvider } from "laravel-react-i18n";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

createInertiaApp({
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    );
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <LaravelReactI18nProvider
        locale={props.initialPage.props.locale as string}
        fallbackLocale="es"
        files={import.meta.glob("/lang/*.json")}
      >
        <App {...props} />
      </LaravelReactI18nProvider>,
    );
  },
  progress: {
    color: "#4B5563",
    showSpinner: true,
  },
});
