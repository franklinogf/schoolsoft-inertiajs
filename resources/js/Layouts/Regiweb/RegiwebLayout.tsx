import Header from "@/Layouts/Regiweb/Header";
import { Teacher } from "@/types/Teacher";
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
        <div className="px-2 py-4">{children}</div>
      </div>
    </>
  );
}
