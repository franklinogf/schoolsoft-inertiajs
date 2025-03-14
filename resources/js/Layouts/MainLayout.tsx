import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { Toaster } from "@/Components/ui/sonner";
import { useFlashToaster } from "@/hooks/flashToaster";
import { PageProps, themes } from "@/types";
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
    return "--" + text.replace(/([A-Z])/g, "-$1").toLowerCase() + ": ";
  }
  const th: keyof themes = "light";
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <style>
          {`
        ${Object.keys(themes)
          .map((key) => {
            const theme = themes[key as keyof themes];
            const head = key === "light" ? "root:" : `.${key}`;
            return `${head} {\n${Object.entries(theme)
              .map(([k, v]) => `${slugify(k)} ${v};`)
              .join("\n")}\n}`.trim();
          })
          .join("\n")}
        `}
        </style>
      </Head>
      {children}
      <ConfirmationDialog />
      <Toaster richColors closeButton theme="light" duration={3000} position="top-center" />
    </>
  );
}
