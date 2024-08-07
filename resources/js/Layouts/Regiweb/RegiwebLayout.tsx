import { Toaster } from "@/Components/ui/sonner";
import Header from "@/Layouts/Regiweb/Header";
import { Teacher } from "@/types/auth";
import { Head } from "@inertiajs/react";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  user: Teacher;
}
export function RegiwebLayout({ children, title, user }: MainLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-dvh flex-col">
        <Header user={user} />
        {children}
        <Toaster richColors theme="light" pauseWhenPageIsHidden position="top-center" />
      </div>
    </>
  );
}
