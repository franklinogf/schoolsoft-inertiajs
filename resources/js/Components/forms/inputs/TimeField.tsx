import { TimePicker, TimePickerProps } from "@/Components/custom-ui/DateTimePicker";
import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { formatStringToTime, formatTimeToString } from "@/lib/utils";
import { useId } from "react";
interface TimeFieldProps extends Pick<TimePickerProps, "granularity" | "hourCycle"> {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}
export function TimeField({
  data,
  setData,
  name,
  error,
  label,
  disabled,
  className,
  granularity = "minute",
  ...props
}: TimeFieldProps) {
  const id = useId();

  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <TimePicker
        granularity={granularity}
        date={formatStringToTime(data[name])}
        onChange={(value) => {
          setData(name, formatTimeToString(value));
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
