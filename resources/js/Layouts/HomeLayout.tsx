import { Footer } from "@/Components/Home/Footer";
import Header from "@/Components/Home/Header";
import { PagePropsWithSchool } from "@/types";
import { Head } from "@inertiajs/react";

interface MainLayoutProps extends PagePropsWithSchool {
  children: React.ReactNode;
  title: string;
}
export function HomeLayout({ children, title, school }: MainLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Head title={title} />
      <Header school={school} />
      <main className="grow">{children}</main>
      <Footer school={school} />
    </div>
  );
}
