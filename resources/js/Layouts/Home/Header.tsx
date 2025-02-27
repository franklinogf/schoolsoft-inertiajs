import { Button } from "@/Components/ui/button";
import { type Admin } from "@/types/auth";
import { Link, usePage } from "@inertiajs/react";
import { ArrowDown } from "lucide-react";

export default function Header({ school }: { school: Admin }) {
  const { url } = usePage();
  return (
    <section className="bg-primary/90 text-primary-foreground grid min-h-40 items-center justify-center p-10 md:min-h-80">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-balance md:text-6xl">{school.colegio}</h1>
        <p className="text-muted py-6 text-pretty">{school.men_ini}</p>
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
