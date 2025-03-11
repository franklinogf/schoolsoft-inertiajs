import Header from "@/Layouts/Regiweb/Header";
import MainLayout from "../MainLayout";

interface RegiwebLayoutProps {
  children: React.ReactNode;
  title: string;
}
export function RegiwebLayout({ children, title }: RegiwebLayoutProps) {
  return (
    <MainLayout title={title}>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="px-2 pt-4 pb-8">{children}</main>
      </div>
    </MainLayout>
  );
}
