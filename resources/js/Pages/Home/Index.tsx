import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { HomeLayout } from "@/Layouts/HomeLayout";
import type { PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const buttons = [
  {
    label: "Administración",
    route: "",
  },
  {
    label: "Regiweb",
    route: "",
  },
  {
    label: "Padres",
    route: "",
  },
  {
    label: "Foro",
    children: [
      { label: "Estudiante", route: "" },
      { label: "Profesor", route: "" },
    ],
  },
  {
    label: "Calendario",
    route: "#",
  },
  {
    label: "Solicitudes",
    route: "#",
  },
  {
    label: "Documentos",
    route: route("home.documents"),
  },
  {
    label: "Cafetería",
    children: [
      { label: "Caja registradora", route: "" },
      { label: "Auto servicio", route: "" },
    ],
  },
];

export default function HomePage({ school }: PagePropsWithSchool) {
  const { t } = useTranslation();
  return (
    <HomeLayout school={school} title={school.colegio}>
      <section className="flex min-h-80 items-center justify-center" id="buttons">
        <ul className="grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 md:grid-cols-4">
          {buttons.map((button) => (
            <li key={button.label}>
              {!button.children ? (
                <Button className="w-full" asChild>
                  <Link href={button.route ?? ""}>{t(button.label)}</Link>
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">{t(button.label)}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {button.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link className="cursor-pointer" href={child.route}>
                          {t(child.label)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </li>
          ))}
        </ul>
      </section>
    </HomeLayout>
  );
}
