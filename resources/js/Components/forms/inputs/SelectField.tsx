import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { useTranslation } from "react-i18next";
export type SelectItemType = { key: string; value: string };
interface SelectFieldProps {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  items: SelectItemType[];
}
export function SelectField({
  error,
  label,
  disabled,
  className,
  data,
  setData,
  name,
  placeholder,
  items,
}: SelectFieldProps) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <Select
        name={name}
        disabled={disabled}
        defaultValue={data[name]}
        onValueChange={(value) => {
          setData(name, value);
        }}
      >
        <SelectTrigger
          id={id}
          className={cn({
            "border-destructive ring-offset-destructive focus-visible:ring-destructive": error,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {t(item.value)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError error={error} />
    </FieldContainer>
  );
}
