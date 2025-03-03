import { ContactForm } from "@/Components/root/ContactForm";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { useTranslations } from "@/hooks/translations";
import RootLayout from "@/Layouts/Root/RootLayout";
import { usePage } from "@inertiajs/react";

export default function Page() {
  const { t } = useTranslations();
  console.log(usePage().props);
  return (
    <RootLayout title={t("Contact us")}>
      <MaxWidthSection>
        <h1 className="title">{t("Contact Form")}</h1>
        <ContactForm />
      </MaxWidthSection>
    </RootLayout>
  );
}
