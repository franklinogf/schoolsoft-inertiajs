import { Button } from "@/Components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { cn } from "@/lib/utils";
import { Teacher } from "@/types/auth";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
const menuItems = [
  { label: "Notas", href: "/" },
  { label: "Opciones", href: "/" },
  { label: "Informes", href: "/" },
];
interface HeaderProps {
  user: Teacher;
}
export default function Header({ user }: HeaderProps) {
  const { url } = usePage();
  const { t } = useTranslation();
  console.log(url);
  return (
    <header className="flex h-14 items-center bg-secondary px-4 shadow">
      <div className="mr-8">
        <img className="h-auto max-w-[100px]" src="/assets/logo-regiweb.gif" alt="Regiweb logo" />
      </div>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink
                active={url === item.href}
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
              <SheetTitle>
                <img
                  className="h-auto max-w-[100px]"
                  src="/assets/logo-regiweb.gif"
                  alt="Regiweb logo"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-1 flex-col justify-start">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Button
                    className={cn("text-lg font-bold", {
                      "bg-accent/80": url === item.href,
                    })}
                    variant="ghost"
                    key={item.label}
                    asChild
                  >
                    <Link href={item.href}>{t(item.label)}</Link>
                  </Button>
                ))}
              </div>
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
  );
}
