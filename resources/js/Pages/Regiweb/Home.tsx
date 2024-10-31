import { GLOBE_PICTURE } from "@/Constants";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/auth";
import { useTranslation } from "react-i18next";

export default function HomePage({ auth }: PagePropsWithUser<Teacher>) {
  const { t } = useTranslation();
  return (
    <RegiwebLayout user={auth.user} title={t("Inicio")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="page-primary-title">{t("Conectate de cualquier parte del mundo")}</h1>
        <img className="h-auto max-w-[400px]" src={GLOBE_PICTURE} alt={t("Globo terraqueo")} />
      </div>
    </RegiwebLayout>
  );
}
