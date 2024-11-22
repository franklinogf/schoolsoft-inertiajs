import { Toaster } from "@/Components/ui/sonner";
import "@/lib/i18n";
import { Suspense } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading">
      {children}
      <Toaster
        richColors
        closeButton
        theme="light"
        pauseWhenPageIsHidden
        duration={3000}
        position="top-center"
      />
    </Suspense>
  );
}
