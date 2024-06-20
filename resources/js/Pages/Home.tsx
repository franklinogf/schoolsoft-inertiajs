import { Head, Link } from "@inertiajs/react";
import type { School } from "@/types";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
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
interface HomePageProps {
    phpVersion: string;
    school: School;
}
export default function HomePage({ school, phpVersion }: HomePageProps) {
    return (
        <>
            <Head title="Welcome" />
            <main>
                <section className="grid justify-center items-center p-10 min-h-dvh bg-primary/90 text-primary-foreground">
                    <div className="max-w-xl">
                        <h1 className="text-balance text-6xl font-bold">
                            {school?.colegio || "Colegio de prueba"}
                        </h1>
                        <p className="text-pretty py-6">
                            {school?.men_ini || "Mensaje de bienvenida"}
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
                                return <Button>{button.label}</Button>;
                            }
                            return (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button>{button.label}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {button.children.map((child) => (
                                            <DropdownMenuItem asChild>
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
            </main>
            <footer className="flex place-items-center bg-primary/90 p-10 text-primary-foreground">
                {school?.dir1 && (
                    <div className="min-w-52">
                        {school?.dir1}
                        <br />
                        {school?.dir2}
                        <br />
                        {school?.pueblo1}, {school?.esta1} {school?.zip1}
                        <br />
                        {school?.telefono}
                    </div>
                )}
                {school?.dir3 && (
                    <section className="min-w-52">
                        {school?.dir3}
                        <br />
                        {school?.dir4}
                        <br />
                        {school?.pueblo2}, {school?.esta2} {school?.zip2}
                        <br />
                        {school?.tel3} / {school?.tel4}
                    </section>
                )}
                <div>
                    <svg
                        className="inline-block fill-current"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        height="50"
                        viewBox="0 0 24 24"
                        width="50"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved
                    </p>
                </div>
            </footer>
        </>
    );
}
