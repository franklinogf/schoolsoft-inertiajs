import { MenuOption, OptionsMenu } from "@/Components/OptionsMenu";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
const options: MenuOption[] = [
  {
    title: "Mensajes",
    items: [
      {
        label: "Correo electrónico",
        route: route("regiweb.options.messages.email.index"),
      },
      {
        label: "SMS",
        route: route("regiweb.options.messages.sms.index"),
      },
      {
        label: "Mensajes",
        route: route("regiweb.options.messages.index"),
      },
    ],
  },
  {
    title: "Informes",
    items: [
      {
        label: "Informe de cambios de notas",
        route: route("regiweb.options.index"),
      },
      {
        label: "Listado de 100",
        route: route("regiweb.options.index"),
      },
      {
        label: "Lista de promedios",
        route: route("regiweb.options.index"),
      },
    ],
  },
  {
    title: "Otros",
    items: [
      {
        label: "Generador de exámenes",
        route: route("regiweb.options.exams.index"),
      },
      {
        label: "Crear tareas",
        route: route("regiweb.options.homeworks.index"),
      },
      {
        label: "Documentos",
        route: route("regiweb.options.index"),
      },
      {
        label: "Notas por examen",
        route: route("regiweb.options.index"),
      },
      {
        label: "Curva de notas",
        route: route("regiweb.options.index"),
      },
      {
        label: "Clasificación de notas",
        route: route("regiweb.options.index"),
      },
    ],
  },
];
export default function Page() {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Opciones")}>
      <OptionsMenu title={t("Mensajes y opciones")} options={options} />
    </RegiwebLayout>
  );
}
