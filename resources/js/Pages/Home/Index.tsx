import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { HomeLayout } from "@/Layouts/Home/HomeLayout";
import i18n from "@/lib/i18n";
import type { PagePropsWithSchool } from "@/types";
import { Link } from "@inertiajs/react";
await i18n.loadNamespaces("pages");

const buttons = [
  {
    label: i18n.t("pages:home.index.btn.admin"),
    route: route("admin.login.index"),
  },
  {
    label: i18n.t("pages:home.index.btn.regiweb"),
    route: route("regiweb.login.index"),
  },
  {
    label: i18n.t("pages:home.index.btn.parents"),
    route: route("parents.login.index"),
  },
  {
    label: i18n.t("pages:home.index.btn.forum.label"),
    children: [
      {
        label: i18n.t("pages:home.index.btn.forum.students"),
        route: route("foro.student.login.index"),
      },
      {
        label: i18n.t("pages:home.index.btn.forum.teachers"),
        route: route("foro.teacher.login.index"),
      },
    ],
  },
  {
    label: i18n.t("pages:home.index.btn.calendar"),
    route: "#",
  },
  {
    label: i18n.t("pages:home.index.btn.requests"),
    route: "#",
  },
  {
    label: i18n.t("pages:home.index.btn.documents"),
    route: route("home.documents"),
  },
  {
    label: i18n.t("pages:home.index.btn.cafeteria.label"),
    children: [
      { label: i18n.t("pages:home.index.btn.cafeteria.cashRegister"), route: "" },
      { label: i18n.t("pages:home.index.btn.cafeteria.autoService"), route: "" },
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
              {!button?.children ? (
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
    </HomeLayout>
  );
}
