import { GLOBE_PICTURE } from "@/Constants";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation(["pages"], { keyPrefix: "regiweb.home" });
  return (
    <RegiwebLayout title={t("title")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="page-primary-title">{t("message")}</h1>
        <img className="h-auto max-w-[400px]" src={GLOBE_PICTURE} alt={t("imageAlt")} />
      </div>
    </RegiwebLayout>
  );
}
