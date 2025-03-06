import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Translations } from "@/hooks/translations";
import { HomeLayout } from "@/Layouts/Home/HomeLayout";
import type { PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
type Button = { label: Translations; route: string };
type ButtonWithChildren = { label: Translations; children: Button[] };
type Buttons = Button | ButtonWithChildren;

const buttons: Buttons[] = [
  {
    label: "Administración",
    route: route("admin.login.index"),
  },
  {
    label: "Regiweb",
    route: route("regiweb.login.index"),
  },
  {
    label: "Padres",
    route: route("parents.login.index"),
  },
  {
    label: "Foro",
    children: [
      {
        label: "Estudiantes",
        route: route("foro.student.login.index"),
      },
      {
        label: "Profesores",
        route: route("foro.teacher.login.index"),
      },
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
      { label: "Caja registradora", route: "#" },
      { label: "Auto servicio", route: "#" },
    ],
  },
];

export default function HomePage({ school }: PagePropsWithSchool) {
  return (
    <HomeLayout school={school} title={school.colegio}>
      <section className="flex min-h-80 items-center justify-center" id="buttons">
        <ul className="grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 md:grid-cols-4">
          {buttons.map((button) => (
            <li key={button.label}>
              {"children" in button ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">{button.label}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {button.children.map((child) => (
                      <DropdownMenuItem key={child.label} asChild>
                        <Link className="cursor-pointer" href={child.route}>
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="w-full" asChild>
                  <Link href={button.route ?? ""}>{button.label}</Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </HomeLayout>
  );
}
