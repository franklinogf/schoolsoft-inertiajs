import { Footer } from "@/Layouts/Home/Footer";
import Header from "@/Layouts/Home/Header";
import { type Admin } from "@/types/auth";
import MainLayout from "../MainLayout";

interface MainLayoutProps {
  school: Admin;
  children: React.ReactNode;
  title: string;
}
export function HomeLayout({ children, title, school }: MainLayoutProps) {
  return (
    <MainLayout title={title}>
      <div className="flex min-h-dvh flex-col">
        <Header school={school} />
        <main className="grow">{children}</main>
        <Footer school={school} />
      </div>
    </MainLayout>
  );
}
