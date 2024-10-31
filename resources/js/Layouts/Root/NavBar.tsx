import { Logo } from "@/Components/root/Logo";
import { Button } from "@/Components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { MENU_LINKS } from "@/Constants/root";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";

export function NavBar() {
  const pathname = route().current();
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-background px-4 shadow-xl">
      <div className="z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription hidden>Menú</SheetDescription>
            </SheetHeader>

            <nav className="mt-10 grid items-start gap-4 px-2 text-lg font-medium lg:px-4">
              {MENU_LINKS.map(({ label, path }) => (
                <Link
                  key={label}
                  href={route(path)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    { "text-primary hover:text-muted-foreground": pathname === path },
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div>
        <Link href={route("home")}>
          <Logo />
        </Link>
      </div>

      <NavLinks />

      <Button size="sm" asChild>
        <Link href={route("contact.index")}>Contactar</Link>
      </Button>
    </header>
  );
}

function NavLinks() {
  const pathname = route().current();
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {MENU_LINKS.map(({ label, path }) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuLink asChild>
              <Link
                className={navigationMenuTriggerStyle({
                  className: { "text-primary hover:text-muted-foreground": pathname === path },
                })}
                href={route(path)}
              >
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
