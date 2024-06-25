import { Button } from "@/Components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/auth";
import { Head, Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
const menuItems = [
  { label: "Notas", href: "/" },
  { label: "Opciones", href: "/" },
  { label: "Informes", href: "/" },
];
interface IndexPageProps extends PagePropsWithUser<Teacher> {}
export default function HomePage({ auth: { user } }: IndexPageProps) {
  const { t } = useTranslation();
  return (
    <>
      <Head title={t("Inicio")} />
      <div className="flex min-h-dvh flex-col">
        <header className="flex h-16 items-center bg-secondary px-4 shadow">
          <div className="mr-8">[Logo]</div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    className={navigationMenuTriggerStyle({
                      className: "bg-transparent font-bold",
                    })}
                  >
                    {t(item.label)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>[Logo]</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-1 flex-col justify-start">
                  {menuItems.map((item) => (
                    <Button className="text-lg font-bold" variant="ghost" key={item.label} asChild>
                      <Link href={item.href}>{t(item.label)}</Link>
                    </Button>
                  ))}
                  <div className="mt-auto flex flex-col">
                    <Button className="text-lg font-bold" variant="ghost" asChild>
                      <Link href="/profile">{t("Perfil")}</Link>
                    </Button>
                    <Button className="text-lg font-bold" variant="ghost" asChild>
                      <Link as="button" method="delete" href={route("regiweb.logout")}>
                        {t("Cerrar sesión")}
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="ml-auto hidden md:flex">
            <Button variant="ghost" asChild>
              <Link href="/profile">{t("Perfil")}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link method="delete" as="button" href={route("regiweb.logout")}>
                {t("Cerrar sesión")}
              </Link>
            </Button>
          </nav>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-2">
          <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-bold">
            {t("Conectate de cualquier parte del mundo")}
          </h1>
          <img className="h-auto max-w-[400px]" src="/assets/globe.gif" alt="Globo terraqueo" />
        </main>
      </div>
    </>
  );
}
