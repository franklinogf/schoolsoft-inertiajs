import { List } from "@/Components/root/List";
import { MaxWidthSection } from "@/Components/root/MaxWidthSection";
import { MODULES } from "@/Constants/root";
import { useTranslations } from "@/hooks/translations";
import RootLayout from "@/Layouts/Root/RootLayout";
export default function Page() {
  const { t } = useTranslations();
  return (
    <RootLayout title={t("Modules")}>
      <MaxWidthSection>
        <div className="cointainer mx-auto max-w-4xl">
          <h2 className="title">{t("Modules")}</h2>
          <List items={MODULES} />
        </div>
      </MaxWidthSection>
    </RootLayout>
  );
}
