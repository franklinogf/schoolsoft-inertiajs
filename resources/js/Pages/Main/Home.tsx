import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MainLayout } from "@/Layouts/MainLayout";
import type { PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
import { ArrowDown } from "lucide-react";

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
    route: "#",
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
    <MainLayout school={school} title={school.colegio}>
      <section className="grid min-h-96 items-center justify-center bg-primary/90 p-10 text-primary-foreground">
        <div className="max-w-2xl">
          <h1 className="text-balance text-3xl font-bold md:text-6xl">{school.colegio}</h1>
          <p className="text-pretty py-6 text-muted">{school.men_ini}</p>
        </div>
        <div className="flex justify-center self-end">
          <Button size="icon" asChild>
            <Link href="#buttons">
              <ArrowDown />
            </Link>
          </Button>
        </div>
      </section>
      <section className="flex min-h-80 items-center justify-center" id="buttons">
        <div className="grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 md:grid-cols-4">
          {buttons.map((button) => {
            if (!button.children) {
              return <Button key={button.label}>{button.label}</Button>;
            }
            return (
              <DropdownMenu key={button.label}>
                <DropdownMenuTrigger asChild>
                  <Button>{button.label}</Button>
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
            );
          })}
        </div>
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
    </MainLayout>
  );
}
