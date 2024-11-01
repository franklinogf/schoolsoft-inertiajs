import { Button } from "@/Components/ui/button";
import { type AdminAuth } from "@/types/auth";
import { Link, usePage } from "@inertiajs/react";
import { ArrowDown } from "lucide-react";

export default function Header({ school }: { school: AdminAuth }) {
  const { url } = usePage();
  return (
    <section className="grid min-h-40 items-center justify-center bg-primary/90 p-10 text-primary-foreground md:min-h-80">
      <div className="max-w-2xl">
        <h1 className="text-balance text-3xl font-bold md:text-6xl">{school.colegio}</h1>
        <p className="text-pretty py-6 text-muted">{school.men_ini}</p>
      </div>
      <div className="flex justify-center self-end">
        {!url.includes("documents") && (
          <Button size="icon" asChild>
            <Link href="#buttons">
              <ArrowDown />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
