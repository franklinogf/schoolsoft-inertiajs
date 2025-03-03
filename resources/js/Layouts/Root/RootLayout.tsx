import { Footer } from "@/Layouts/Root/Footer";
import { NavBar } from "@/Layouts/Root/NavBar";
import MainLayout from "../MainLayout";

interface RootLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}
export default function RootLayout({ children, title, description }: RootLayoutProps) {
  return (
    <MainLayout title={`Schoolsoft | ${title}`} description={description}>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </MainLayout>
  );
}
