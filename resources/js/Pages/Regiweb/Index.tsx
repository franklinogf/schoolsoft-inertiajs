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
  const { t } = useTranslation(["pages", "common"]);
  return (
    <>
      <Head title={t("regiweb.index.title", { ns: "pages" })} />
      <main className="flex min-h-dvh place-items-center justify-center">
        <div className="w-[700px] px-2">
          <div className="flex justify-center">
            <img
              className="my-4 h-auto max-w-[400px]"
              src={LOGO_REGIWEB}
              alt={t("regiweb.index.imageAlt")}
            />
          </div>
          <div className="rounded-md bg-secondary/50 p-4 shadow">
            <h1 className="text-center text-2xl font-bold">
              {t("regiweb.index.card.title", { ns: "pages" })}
            </h1>
            <hr className="my-4" />
            <div className="flex flex-col items-center space-y-2">
              <InfoBadge
                label={t("regiweb.index.card.name", { ns: "pages" })}
                value={`${user.nombre} ${user.apellidos}`}
              />
              <InfoBadge label={t("regiweb.index.card.id", { ns: "pages" })} value={user.id} />
              <InfoBadge
                label={t("regiweb.index.card.group", { ns: "pages" })}
                value={user.grupo}
              />
              <InfoBadge
                label={t("regiweb.index.card.lastEntry", { ns: "pages" })}
                value={formatDate(user.ufecha, { dateStyle: "long" })}
              />
              <InfoBadge label={t("regiweb.index.card.ip", { ns: "pages" })} value={ip} />
              <InfoBadge
                label={t("regiweb.index.card.time", { ns: "pages" })}
                value={new Date().toLocaleTimeString()}
              />
            </div>
            <hr className="my-4" />
            <div className="grid">
              <Button asChild>
                <Link href={route("regiweb.home")}>{t("btn.continue", { ns: "common" })}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
