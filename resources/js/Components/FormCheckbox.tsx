import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { useTranslation } from "react-i18next";
interface FormCheckboxProps {
  label: string;
  description?: string;
  error?: string;
  value: boolean;
  onChange: (checked: boolean) => void;
}
export function FormCheckbox({ label, value, onChange, description }: FormCheckboxProps) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <div className={cn("flex space-x-2", description ? "items-top" : "items-center")}>
      <Checkbox checked={value} onCheckedChange={onChange} id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>{t(label)}</Label>
        {description ? <p className="text-sm text-muted-foreground">{t(description)}</p> : null}
      </div>
    </div>
  );
}
