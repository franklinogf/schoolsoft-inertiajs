import Header from "@/Layouts/Regiweb/Header";
import { TeacherAuth } from "@/types/auth";
import { Head } from "@inertiajs/react";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  user: TeacherAuth;
}
export function RegiwebLayout({ children, title, user }: MainLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-dvh flex-col">
        <Header user={user} />
        {children}
      </div>
    </>
  );
}
