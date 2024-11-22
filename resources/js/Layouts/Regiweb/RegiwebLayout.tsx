import Header from "@/Layouts/Regiweb/Header";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/teacher";
import { Head, usePage } from "@inertiajs/react";

interface RegiwebLayoutProps {
  children: React.ReactNode;
  title: string;
}
export function RegiwebLayout({ children, title }: RegiwebLayoutProps) {
  const {
    auth: { user },
  } = usePage<PagePropsWithUser<Teacher>>().props;
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-dvh flex-col">
        <Header user={user} />
        <main className="px-2 pb-8 pt-4">{children}</main>
      </div>
    </>
  );
}
