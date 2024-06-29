import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useId } from "react";
import { useTranslation } from "react-i18next";
export type SelectItemType = { key: string; value: string }[];
interface FormSelectProps {
  label: string;
  error?: string;
  items: SelectItemType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export function FormSelect({ label, value, onChange, placeholder, error, items }: FormSelectProps) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <div className="space-y-0.5">
      <Label htmlFor={id}>{t(label)}</Label>
      <Select defaultValue={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={t(placeholder ?? "")} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {t(item.value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
