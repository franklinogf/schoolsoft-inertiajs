import { Footer } from "@/Layouts/Home/Footer";
import Header from "@/Layouts/Home/Header";
import { PagePropsWithSchool } from "@/types";
import { Head } from "@inertiajs/react";

interface MainLayoutProps extends PagePropsWithSchool {
  children: React.ReactNode;
  title: string;
}
export function HomeLayout({ children, title, school }: MainLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-dvh flex-col">
        <Header school={school} />
        <main className="grow">{children}</main>
        <Footer school={school} />
      </div>
    </>
  );
}
