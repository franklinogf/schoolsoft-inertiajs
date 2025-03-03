import { MenuOption, OptionsMenu } from "@/Components/OptionsMenu";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function Page({ options }: { options: MenuOption[] }) {
  return (
    <RegiwebLayout title="Opciones">
      <OptionsMenu title="Mensajes y opciones" options={options} />
    </RegiwebLayout>
  );
}
