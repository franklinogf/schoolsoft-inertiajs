import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Input, type InputProps } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface InputFieldProps
  extends Omit<InputProps, "value" | "onChange" | "id" | "disabled" | "name"> {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  removeArrows?: boolean;
}
export function InputField({
  error,
  label,
  disabled,
  className,
  data,
  setData,
  name,
  removeArrows,
  ...props
}: InputFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <Input
        disabled={disabled}
        id={id}
        className={cn(
          {
            "border-destructive ring-offset-destructive focus-visible:ring-destructive": error,
          },
          { "remove-arrows": removeArrows },
        )}
        value={data[name]}
        onChange={(e) => {
          setData(name, e.target.value);
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
