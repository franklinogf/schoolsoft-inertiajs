import { Footer } from "@/Layouts/Root/Footer";
import { NavBar } from "@/Layouts/Root/NavBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
