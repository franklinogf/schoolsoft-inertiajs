import { InfoBadge } from "@/Components/InfoBadge";
import { Button } from "@/Components/ui/button";
import { LOGO_REGIWEB } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import MainLayout from "@/Layouts/MainLayout";
import { formatDate } from "@/lib/utils";
import { type PagePropsWithUser } from "@/types";
import { type Teacher } from "@/types/teacher";
import { Link } from "@inertiajs/react";

interface IndexPageProps extends PagePropsWithUser<Teacher> {
  ip: string;
}
export default function IndexPage({ auth: { user }, ip }: IndexPageProps) {
  const { t } = useTranslations();
  return (
    <MainLayout title={t("Bienvenido a Regiweb")}>
      <main className="flex min-h-dvh place-items-center justify-center">
        <div className="w-[700px] px-2">
          <div className="flex justify-center">
            <img className="my-4 h-auto max-w-[400px]" src={LOGO_REGIWEB} alt="Regiweb Logo" />
          </div>
          <div className="bg-secondary/50 rounded-md p-4 shadow-sm">
            <h1 className="text-center text-2xl font-bold">{t("Bienvenido a Regiweb")}</h1>
            <hr className="my-4" />
            <div className="grid grid-cols-2 gap-2">
              <InfoBadge label={t("Nombre")} value={`${user.nombre} ${user.apellidos}`} />
              <InfoBadge label="ID" value={user.id} />
              <InfoBadge label={t("Grupo")} value={user.grupo} />
              <InfoBadge
                label={t("Última entrada")}
                value={formatDate(user.ufecha, { dateStyle: "long" })}
              />
              <InfoBadge label="IP" value={ip} />
              <InfoBadge label={t("Hora")} value={new Date().toLocaleTimeString()} />
            </div>
            <hr className="my-4" />
            <div className="grid">
              <Button asChild>
                <Link href={route("regiweb.home")}>{t("Continuar")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
