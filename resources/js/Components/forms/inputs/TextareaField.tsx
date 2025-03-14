import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Textarea, type TextareaProps } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface TextareaFieldProps extends Omit<TextareaProps, "onChange" | "id"> {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}
export function TextareaField({
  error,
  label,
  disabled,
  className,
  onChange,
  ...props
}: TextareaFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <Textarea
        disabled={disabled}
        id={id}
        className={cn({
          "border-destructive ring-offset-destructive focus-visible:ring-destructive": error,
        })}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
