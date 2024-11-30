import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";
export type MenuOption = { title: string; items: { label: string; route: string }[] };
interface OptionsMenuProps {
  title: string;
  options: MenuOption[];
}
export function OptionsMenu({ title, options }: OptionsMenuProps) {
  return (
    <>
      <h1 className="page-primary-title">{title}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option, index) => (
          <fieldset key={index} className="border-2 border-primary p-2">
            <legend className="text-lg font-semibold">{option.title}</legend>
            <ul className="space-y-4">
              {option.items.map((item, index) => (
                <li key={index}>
                  <Button className="w-full" asChild>
                    <Link href={item.route}>{item.label.toUpperCase()}</Link>
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
