import { InfoBadge } from "@/Components/InfoBadge";
import { Button } from "@/Components/ui/button";
import { LOGO_REGIWEB } from "@/Constants";
import { formatDate } from "@/lib/utils";
import { type PagePropsWithUser } from "@/types";
import { type Teacher } from "@/types/teacher";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

interface IndexPageProps extends PagePropsWithUser<Teacher> {
  ip: string;
}
export default function IndexPage({ auth: { user }, ip }: IndexPageProps) {
  const { t } = useTranslation();
  return (
    <>
      <Head title={t("Inicio")} />
      <main className="flex min-h-dvh place-items-center justify-center">
        <div className="w-[700px] px-2">
          <div className="flex justify-center">
            <img className="my-4 h-auto max-w-[400px]" src={LOGO_REGIWEB} alt="Logo Regiweb" />
          </div>
          <div className="rounded-md bg-secondary/50 p-4 shadow">
            <h1 className="text-center text-2xl font-bold">{t("Bienvenido")}</h1>
            <hr className="my-4" />
            <div className="flex flex-col items-center space-y-2">
              <InfoBadge label={t("Nombre")} value={`${user.nombre} ${user.apellidos}`} />
              <InfoBadge label={t("ID")} value={user.id} />
              <InfoBadge label={t("Grupo")} value={user.grupo} />
              <InfoBadge
                label={t("Ultima entrada")}
                value={formatDate(user.ufecha, { dateStyle: "long" })}
              />
              <InfoBadge label={t("IP")} value={ip} />
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
    </>
  );
}
