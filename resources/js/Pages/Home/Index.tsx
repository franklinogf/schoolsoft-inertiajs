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
      { label: "Caja", route: "" },
      { label: "Auto servicio", route: "" },
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
              {!button.children ? (
                <Button className="w-full" asChild>
                  <Link href={button.route ?? ""}>{button.label}</Link>
                </Button>
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </section>
      {/* <section
                            className="min-h-80 flex flex-col items-center justify-evenly gap-5 bg-base-200/90 p-10 md:flex-row md:p-5">
                        <div className="max-w-96 card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                            </div>
                        </div>
                        <div className="max-w-96 card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                            </div>
                        </div>
                    </section> */}
    </HomeLayout>
  );
}
