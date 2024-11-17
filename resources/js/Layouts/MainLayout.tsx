import { Toaster } from "@/Components/ui/sonner";
import "@/lib/i18n";
import { Suspense } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback="loading">
      {children}
      <Toaster richColors theme="light" pauseWhenPageIsHidden position="top-center" />
    </Suspense>
  );
}
