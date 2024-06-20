import { Footer } from "@/Components/School/Footer";
import { PagePropsWithSchool } from "@/types";
import { Head } from "@inertiajs/react";

interface MainLayoutProps extends PagePropsWithSchool {
    children: React.ReactNode;
    title: string;
}
export function MainLayout({ children, title, school }: MainLayoutProps) {
    return (
        <>
            <Head title={title} />
            <main>{children}</main>
            <Footer school={school} />
        </>
    );
}
