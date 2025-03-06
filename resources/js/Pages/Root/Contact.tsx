import { ContactForm } from "@/Components/root/ContactForm";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { useTranslations } from "@/hooks/translations";
import RootLayout from "@/Layouts/Root/RootLayout";
import { usePage } from "@inertiajs/react";

export default function Page() {
  const { t } = useTranslations();
  console.log(usePage().props);
  return (
    <RootLayout title={t("Contáctenos")}>
      <MaxWidthSection>
        <h1 className="title">{t("Formulario de Contacto")}</h1>
        <ContactForm />
      </MaxWidthSection>
    </RootLayout>
  );
}
