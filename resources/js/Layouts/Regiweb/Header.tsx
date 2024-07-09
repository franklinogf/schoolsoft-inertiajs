import { UserProfileDropdownButton } from "@/Components/UserProfileDropdownButton";
import { Button } from "@/Components/ui/button";
import { DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { LOGO_REGIWEB } from "@/Constants";
import { cn } from "@/lib/utils";
import { Teacher } from "@/types/auth";
import { Link, usePage } from "@inertiajs/react";
import { Menu, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const menuItems = [
  { label: "Notas", href: route("regiweb.notes") },
  { label: "Opciones", href: "/" },
  { label: "Informes", href: "/" },
];
interface HeaderProps {
  user: Teacher;
}
export default function Header({ user }: HeaderProps) {
  const { url } = usePage();
  const { t } = useTranslation();
  return (
    <header className="flex h-14 items-center bg-secondary px-4 shadow">
      <div className="mr-8">
        <Link href={route("regiweb.home")}>
          <img className="h-auto max-w-[100px]" src={LOGO_REGIWEB} alt={t("Logo regiweb")} />
        </Link>
      </div>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink
                asChild
                active={item.href.includes(url)}
                className={navigationMenuTriggerStyle({
                  className: "bg-transparent font-bold",
                })}
              >
                <Link href={item.href}>{t(item.label)}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <nav className="ml-auto hidden md:flex md:items-center">
        <UserProfileDropdownButton
          avatar={user.tipo}
          avatarFallback={`${user.nombre[0]}${user.apellidos[0]}`}
        >
          <DropdownMenuItem>
            <Link href={route("regiweb.profile.show")} className="flex w-full grow items-center">
              <UserCircle className="mr-1 size-4" />
              {t("Perfil")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link method="delete" as="button" href={route("regiweb.logout")}>
              {t("Cerrar sesión")}
            </Link>
          </DropdownMenuItem>
        </UserProfileDropdownButton>
      </nav>
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
                <img className="h-auto max-w-[100px]" src={LOGO_REGIWEB} alt="Logo regiweb" />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-1 flex-col justify-start">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Button
                    className={cn("text-lg font-bold", {
                      "bg-accent/80": item.href.includes(url),
                    })}
                    variant="ghost"
                    key={item.label}
                    asChild
                  >
                    <Link href={item.href}>{t(item.label)}</Link>
                  </Button>
                ))}
              </div>
              <div className="mt-auto flex flex-col items-end">
                <UserProfileDropdownButton
                  avatar={user.tipo}
                  avatarFallback={`${user.nombre[0]}${user.apellidos[0]}`}
                >
                  <DropdownMenuItem>
                    <Link
                      href={route("regiweb.profile.show")}
                      className="flex w-full grow items-center"
                    >
                      <UserCircle className="mr-1 size-4" />
                      {t("Perfil")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link method="delete" as="button" href={route("regiweb.logout")}>
                      {t("Cerrar sesión")}
                    </Link>
                  </DropdownMenuItem>
                </UserProfileDropdownButton>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
