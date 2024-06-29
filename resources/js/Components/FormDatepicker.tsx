import { Label } from "@/Components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { cn, formatDate, formatStringToDate } from "@/lib/utils";
import { useId } from "react";
import { DayPickerSingleProps } from "react-day-picker";
import { useTranslation } from "react-i18next";
type FormDatePickerProps = Omit<DayPickerSingleProps, "selected" | "onSelect" | "mode"> & {
  label?: string;
  error?: string;
  placeholder?: string;
  selected: string;
  onSelect: (value: Date | undefined) => void;
};
export function FormDatePicker({
  label,
  placeholder,
  selected,
  onSelect,
  error,
  className,
  disabled,
  ...props
}: FormDatePickerProps) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <div className="w-full space-y-0.5">
      {label ? <Label htmlFor={id}>{t(label)}</Label> : null}
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <Button
            disabled={disabled ? true : false}
            id={id}
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              className,
              !selected && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              formatDate(selected)
            ) : (
              <span>{t(placeholder ?? "Selecciona una fecha")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            selected={formatStringToDate(selected)}
            onSelect={onSelect}
            mode="single"
            initialFocus
            disabled={disabled}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
