import { Head, Link } from "@inertiajs/react";
import type { PagePropsWithSchool } from "@/types";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { MainLayout } from "@/Layouts/MainLayout";

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
            <section className="grid justify-center items-center p-10 min-h-96 bg-primary/90 text-primary-foreground">
                <div className="max-w-2xl">
                    <h1 className="text-balance text-3xl md:text-6xl font-bold">
                        {school.colegio}
                    </h1>
                    <p className="text-pretty text-muted py-6">
                        {school.men_ini}
                    </p>
                </div>
                <div className="self-end flex justify-center">
                    <Button size="icon" asChild>
                        <Link href="#buttons">
                            <ArrowDown />
                        </Link>
                    </Button>
                </div>
            </section>
            <section
                className="min-h-80 flex items-center justify-center"
                id="buttons"
            >
                <div className="grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 md:grid-cols-4">
                    {buttons.map((button) => {
                        if (!button.children) {
                            return (
                                <Button key={button.label}>
                                    {button.label}
                                </Button>
                            );
                        }
                        return (
                            <DropdownMenu key={button.label}>
                                <DropdownMenuTrigger asChild>
                                    <Button>{button.label}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {button.children.map((child) => (
                                        <DropdownMenuItem
                                            key={child.label}
                                            asChild
                                        >
                                            <Link
                                                className="cursor-pointer"
                                                href={child.route}
                                            >
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
