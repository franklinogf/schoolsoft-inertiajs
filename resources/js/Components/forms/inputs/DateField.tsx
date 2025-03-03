import { DateTimePicker, type DateTimePickerProps } from "@/Components/custom-ui/DateTimePicker";
import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Button } from "@/Components/ui/button";
import { useTranslations } from "@/hooks/translations";
import { formatDateToString, formatStringToDate } from "@/lib/utils";
import { enUS, es } from "date-fns/locale";
import { XSquare } from "lucide-react";
import { useId } from "react";
interface DatePickerInputProps
  extends Pick<DateTimePickerProps, "yearRange" | "displayFormat" | "showOutsideDays"> {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  clearable?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}
export function DateField({
  label,
  error,
  className,
  disabled,
  placeholder,
  yearRange = 50,
  displayFormat = { hour24: "PP" },
  clearable = true,
  value,
  onChange,
  ...props
}: DatePickerInputProps) {
  const { t, currentLocale } = useTranslations();

  const id = useId();

  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <div className="relative w-full">
        <DateTimePicker
          disabled={disabled}
          id={id}
          yearRange={yearRange}
          locale={currentLocale() === "es" ? es : enUS}
          displayFormat={displayFormat}
          granularity="day"
          placeholder={placeholder ?? t("Select a date")}
          value={formatStringToDate(value)}
          onChange={(value) => {
            onChange && onChange(formatDateToString(value));
          }}
          {...props}
        />
        {!disabled && clearable && value && (
          <Button
            onClick={() => {
              onChange && onChange("");
            }}
            asChild
            className="size-4"
            size="icon"
            variant="ghost"
          >
            <XSquare className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer" />
          </Button>
        )}
      </div>
      <FieldError error={error} />
    </FieldContainer>
  );
}
