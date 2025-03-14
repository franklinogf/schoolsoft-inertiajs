import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { Toaster } from "@/Components/ui/sonner";
import { useFlashToaster } from "@/hooks/flashToaster";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}
export default function MainLayout({ children, title, description }: MainLayoutProps) {
  useFlashToaster();
  const {
    themes: { light, dark },
    current,
  } = usePage<PageProps>().props.theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", current);
  }, [current]);

  return (
    <>
      <Head>
        {/* <html data-theme={current} /> */}
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <style>
          {`
            :root {
                --background: ${light.background};
                --foreground: ${light.foreground};

                --muted: ${light.muted};
                --muted-foreground: ${light.mutedForeground};

                --popover: ${light.popover};
                --popover-foreground: ${light.popoverForeground};

                --card: ${light.card};
                --card-foreground: ${light.cardForeground};

                --primary: ${light.primary};
                --primary-foreground: ${light.primaryForeground};

                --secondary: ${light.secondary};
                --secondary-foreground: ${light.secondaryForeground};

                --accent: ${light.accent};
                --accent-foreground: ${light.accentForeground};

                --destructive: ${light.destructive};
                --destructive-foreground: ${light.destructiveForeground};

                --border: ${light.border};
                --input: ${light.input};
                --ring: ${light.ring};

                --radius: ${light.radius};
            }

            [data-theme="dark"] {
                --background: ${dark.background};
                --foreground: ${dark.foreground};

                --muted: ${dark.muted};
                --muted-foreground: ${dark.mutedForeground};

                --popover: ${dark.popover};
                --popover-foreground: ${dark.popoverForeground};

                --card: ${dark.card};
                --card-foreground: ${dark.cardForeground};

                --primary: ${dark.primary};
                --primary-foreground: ${dark.primaryForeground};

                --secondary: ${dark.secondary};
                --secondary-foreground: ${dark.secondaryForeground};

                --accent: ${dark.accent};
                --accent-foreground: ${dark.accentForeground};

                --destructive: ${dark.destructive};
                --destructive-foreground: ${dark.destructiveForeground};

                --border: ${dark.border};
                --input: ${dark.input};
                --ring: ${dark.ring};

                --radius: ${dark.radius};
            }
            `}
        </style>
      </Head>
      {children}
      <ConfirmationDialog />
      <Toaster richColors closeButton theme="light" duration={3000} position="top-center" />
    </>
  );
}
