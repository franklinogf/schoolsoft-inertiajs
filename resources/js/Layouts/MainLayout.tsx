import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { Toaster } from "@/Components/ui/sonner";
import { useFlashToaster } from "@/hooks/flashToaster";
import { PageProps, Themes } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}
export default function MainLayout({ children, title, description }: MainLayoutProps) {
  useFlashToaster();
  const { themes, current } = usePage<PageProps>().props.theme;
  useEffect(() => {
    document.documentElement.classList.add(current);
  }, [current]);

  function slugify(text: string) {
    return "--" + text.replace(/([A-Z])/g, "-$1").toLowerCase() + ":";
  }

  function createThemes(themes: Themes) {
    return Object.keys(themes)
      .map((key) => {
        const theme = themes[key as keyof Themes];
        const head = key === "light" ? ":root" : `.${key}`;
        return `${head} {\n${Object.entries(theme)
          .map(([k, v]) => `${slugify(k)}${v};`)
          .join("\n")}\n}`.trim();
      })
      .join("\n");
  }

  const th = createThemes(themes);

  return (
    <>
      <Head>
        <style>{th}</style>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {children}
      <ConfirmationDialog />
      <Toaster richColors theme="light" duration={3000} position="top-center" />
    </>
  );
}
