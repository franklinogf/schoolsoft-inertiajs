import { MenuOption, OptionsMenu } from "@/Components/OptionsMenu";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function Page({ options }: { options: MenuOption[] }) {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Opciones")}>
      <OptionsMenu title={t("Mensajes y opciones")} options={options} />
    </RegiwebLayout>
  );
}
