import { ContactForm } from "@/Components/root/ContactForm";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("home", { keyPrefix: "contact" });
  return (
    <>
      <Head title={t("meta.title")} />
      <MaxWidthSection>
        <h1 className="title">{t("title")}</h1>
        <ContactForm />
      </MaxWidthSection>
    </>
  );
}
