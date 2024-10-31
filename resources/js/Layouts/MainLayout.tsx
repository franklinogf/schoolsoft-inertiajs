import { Toaster } from "@/Components/ui/sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors theme="light" pauseWhenPageIsHidden position="top-center" />
    </>
  );
}
