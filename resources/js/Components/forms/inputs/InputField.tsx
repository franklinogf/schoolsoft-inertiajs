import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface InputFieldProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "id"> {
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  removeArrows?: boolean;
  fieldClassName?: string;
}

export function InputField({
  error,
  label,
  disabled,
  className,
  value,
  onChange,
  removeArrows,
  fieldClassName,
  ...props
}: InputFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <Input
        disabled={disabled}
        id={id}
        value={value}
        className={cn(
          fieldClassName,
          "bg-input",
          {
            "border-destructive ring-offset-destructive focus-visible:ring-destructive": error,
          },
          { "remove-arrows": removeArrows },
        )}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
