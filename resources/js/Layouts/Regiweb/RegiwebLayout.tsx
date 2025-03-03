import Header from "@/Layouts/Regiweb/Header";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/teacher";
import { usePage } from "@inertiajs/react";
import MainLayout from "../MainLayout";

interface RegiwebLayoutProps {
  children: React.ReactNode;
  title: string;
}
export function RegiwebLayout({ children, title }: RegiwebLayoutProps) {
  const {
    auth: { user },
  } = usePage<PagePropsWithUser<Teacher>>().props;
  return (
    <MainLayout title={title}>
      <div className="flex min-h-dvh flex-col">
        <Header user={user} />
        <main className="px-2 pt-4 pb-8">{children}</main>
      </div>
    </MainLayout>
  );
}
