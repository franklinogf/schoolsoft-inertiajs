import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/auth";
import { useTranslation } from "react-i18next";

export default function HomePage({ auth }: PagePropsWithUser<Teacher>) {
  const { t } = useTranslation();
  return (
    <RegiwebLayout user={auth.user} title={t("Inicio")}>
      <div className="flex grow flex-col items-center justify-center gap-6 px-2">
        <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-bold">
          {t("Conectate de cualquier parte del mundo")}
        </h1>
        <img className="h-auto max-w-[400px]" src="/assets/globe.gif" alt="Globo terraqueo" />
      </div>
    </RegiwebLayout>
  );
}
