import "../css/app.css";
import "./bootstrap";
import MainLayout from "./Layouts/MainLayout";
import RootLayout from "./Layouts/Root/RootLayout";
import "./lib/i18n";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

createInertiaApp({
  title: (title) => `${title}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    );
    // @ts-ignore
    page.default.layout = (page) => (
      <MainLayout>{name.startsWith("Root") ? <RootLayout children={page} /> : page}</MainLayout>
    );
    return page;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
    showSpinner: true,
  },
});
