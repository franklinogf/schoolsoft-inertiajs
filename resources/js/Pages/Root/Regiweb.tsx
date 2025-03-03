import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { REGIWEB } from "@/Constants/root";
import { useTranslations } from "@/hooks/translations";
import RootLayout from "@/Layouts/Root/RootLayout";

export default function Page() {
  const { t } = useTranslations();
  return (
    <RootLayout title={t("Regiweb")}>
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">{t("Regiweb")}</h2>
          <List items={REGIWEB} />
        </div>
      </MaxWidthSection>
    </RootLayout>
  );
}
