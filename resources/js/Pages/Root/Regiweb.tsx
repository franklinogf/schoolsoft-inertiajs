import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { REGIWEB } from "@/Constants/root";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation("home");
  return (
    <>
      <Head title={t("regiweb.title")} />
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">{t("regiweb.title")}</h2>
          <List items={REGIWEB} />
        </div>
      </MaxWidthSection>
    </>
  );
}
