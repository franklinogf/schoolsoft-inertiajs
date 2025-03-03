import { GLOBE_PICTURE } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function HomePage() {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Home")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="page-primary-title">{t("Connect from anywhere in the world")}</h1>
        <img className="h-auto max-w-[400px]" src={GLOBE_PICTURE} alt={t("Globe")} />
      </div>
    </RegiwebLayout>
  );
}
