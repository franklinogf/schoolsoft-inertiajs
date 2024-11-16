import { GLOBE_PICTURE } from "@/Constants";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <RegiwebLayout title={t("Inicio")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="page-primary-title">{t("Conectate de cualquier parte del mundo")}</h1>
        <img className="h-auto max-w-[400px]" src={GLOBE_PICTURE} alt={t("Globo terraqueo")} />
      </div>
    </RegiwebLayout>
  );
}
