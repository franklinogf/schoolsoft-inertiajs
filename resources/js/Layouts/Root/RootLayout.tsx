import { Footer } from "@/Layouts/Root/Footer";
import { NavBar } from "@/Layouts/Root/NavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
