import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { Toaster } from "@/Components/ui/sonner";
import { useFlashToaster } from "@/hooks/flashToaster";
import { Head } from "@inertiajs/react";
interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  theme?: {
    background?: string;
    foreground?: string;
    muted?: string;
    mutedForeground?: string;
    popover?: string;
    popoverForeground?: string;
    card?: string;
    cardForeground?: string;
    primary?: string;
    primaryForeground?: string;
    secondary?: string;
    secondaryForeground?: string;
    accent?: string;
    accentForeground?: string;
    destructive?: string;
    destructiveForeground?: string;
    border?: string;
    input?: string;
    ring?: string;
    radius?: string;
  };
}
export default function MainLayout({ children, title, description, theme }: MainLayoutProps) {
  useFlashToaster();
  const {
    background = "214 52% 100%",
    foreground = "214 80% 4%",
    muted = "214 24% 92%",
    mutedForeground = "214 6% 35%",
    popover = "214 52% 100%",
    popoverForeground = "214 80% 4%",
    card = "214 52% 100%",
    cardForeground = "214 80% 4%",
    primary = "214 47% 41%",
    primaryForeground = "0 0% 100%",
    secondary = "214 4% 87%",
    secondaryForeground = "214 4% 27%",
    accent = "214 4% 87%",
    accentForeground = "214 4% 27%",
    destructive = "6 99% 29%",
    destructiveForeground = "6 99% 89%",
    border = "214 4% 90%",
    input = "214 4% 90%",
    ring = "214 47% 41%",
    radius = "0.5rem",
  } = theme || {};
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <style>
          {`
            :root {
                --background: ${background};
                --foreground: ${foreground};

                --muted: ${muted};
                --muted-foreground: ${mutedForeground};

                --popover: ${popover};
                --popover-foreground: ${popoverForeground};

                --card: ${card};
                --card-foreground: ${cardForeground};

                --primary: ${primary};
                --primary-foreground: ${primaryForeground};

                --secondary: ${secondary};
                --secondary-foreground: ${secondaryForeground};

                --accent: ${accent};
                --accent-foreground: ${accentForeground};

                --destructive: ${destructive};
                --destructive-foreground: ${destructiveForeground};

                --border: ${border};
                --input: ${input};
                --ring: ${ring};

                --radius: ${radius};
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
