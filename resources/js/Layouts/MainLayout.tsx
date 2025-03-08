import ConfirmationDialog from "@/Components/ConfirmationDialog";
import { Toaster } from "@/Components/ui/sonner";
import { useFlashToaster } from "@/hooks/flashToaster";
import { Head } from "@inertiajs/react";
interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}
export default function MainLayout({ children, title, description }: MainLayoutProps) {
  useFlashToaster();
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {children}
      <ConfirmationDialog />
      <Toaster richColors closeButton theme="light" duration={3000} position="top-center" />
    </>
  );
}
