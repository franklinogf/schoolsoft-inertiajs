import { DateTimePicker, type DateTimePickerProps } from "@/Components/custom-ui/DateTimePicker";
import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { formatDateToString, formatStringToDate } from "@/lib/utils";
import { enUS, es } from "date-fns/locale";
import { useId } from "react";
import { useTranslation } from "react-i18next";
interface DatePickerInputProps
  extends Pick<DateTimePickerProps, "yearRange" | "displayFormat" | "showOutsideDays"> {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}
export function DateField({
  label,
  error,
  className,
  disabled,
  placeholder,
  data,
  name,
  setData,
  yearRange = 80,
  displayFormat = { hour24: "PPP" },
  ...props
}: DatePickerInputProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const id = useId();

  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <DateTimePicker
        disabled={disabled}
        id={id}
        yearRange={yearRange}
        locale={language === "es" ? es : enUS}
        displayFormat={displayFormat}
        granularity="day"
        placeholder={placeholder ?? t("Selecciona una fecha")}
        value={formatStringToDate(data[name])}
        onChange={(value) => {
          setData(name, formatDateToString(value));
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
