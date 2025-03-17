import { Button } from "@/Components/ui/button";
import { useTranslations, type Translations } from "@/hooks/translations";
import { Link } from "@inertiajs/react";
export type MenuOption = { title: Translations; items: { label: Translations; route: string }[] };
interface OptionsMenuProps {
  title: string;
  options: MenuOption[];
}
export function OptionsMenu({ title, options }: OptionsMenuProps) {
  const { t } = useTranslations();
  return (
    <>
      <h1 className="page-primary-title">{title}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {options.map(({ title, items }, index) => (
          <fieldset key={index} className="border-input border-2 p-2">
            <legend className="text-lg font-semibold">{t(title)}</legend>
            <ul className="space-y-4">
              {items.map(({ route, label }, index) => (
                <li key={index}>
                  <Button className="w-full" asChild>
                    <Link href={route}>{t(label).toUpperCase()}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </>
  );
}
