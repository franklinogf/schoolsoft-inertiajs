import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import type { PagePropsWithUser } from "@/types";
import type { Teacher } from "@/types/auth";
import { useTranslation } from "react-i18next";
interface PageProps extends PagePropsWithUser<Teacher> {
  grade: string;
  page: PagesEnum;
  trimester: TrimesterEnum;
}
export default function Show({ auth, grade, page, trimester }: PageProps) {
  const { t } = useTranslation();
  return (
    <RegiwebLayout user={auth.user} title={t("Inicio")}>
      <h1>{page}</h1>
    </RegiwebLayout>
  );
}
