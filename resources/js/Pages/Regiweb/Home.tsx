import { GLOBE_PICTURE } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function HomePage() {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Inicio")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="page-primary-title">{t("Conéctese desde cualquier parte del mundo")}</h1>
        <img className="h-auto max-w-[400px]" src={GLOBE_PICTURE} alt={t("Globo")} />
      </div>
    </RegiwebLayout>
  );
}
