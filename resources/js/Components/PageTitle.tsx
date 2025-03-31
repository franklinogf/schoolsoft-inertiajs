import { useTranslations } from "@/hooks/translations";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";

export function PageTitle({
  children,
  className,
  backLink,
}: {
  children: React.ReactNode;
  className?: string;
  backLink?: string;
}) {
  const { t } = useTranslations();
  if (backLink) {
    return (
      <div className={cn("my-2 flex flex-col items-center gap-2", className)}>
        <h1 className={"text-center text-3xl font-bold"}>{children}</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href={backLink}>{t("Ir atrás")}</Link>
        </Button>
      </div>
    );
  }
  return <h1 className={cn("my-2 text-center text-3xl font-bold", className)}>{children}</h1>;
}
