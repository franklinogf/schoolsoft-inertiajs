import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Textarea, type TextareaProps } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface TextareaFieldProps extends TextareaProps {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}
export function TextareaField({
  error,
  label,
  disabled,
  className,
  data,
  setData,
  name,
  ...props
}: TextareaFieldProps) {
  console.log(label);
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
