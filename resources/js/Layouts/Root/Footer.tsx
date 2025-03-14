import { Logo } from "@/Components/root/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary">
      <div className="mx-auto flex flex-col items-center px-5 py-8 sm:flex-row sm:justify-between">
        <Logo />
        <p className="text-secondary-foreground mt-4 text-sm sm:mt-0 sm:ml-4 sm:py-2 sm:pl-4">
          © {currentYear}
        </p>
      </div>
    </footer>
  );
}
