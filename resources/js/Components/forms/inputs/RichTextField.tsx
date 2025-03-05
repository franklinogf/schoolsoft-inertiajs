import { RichTextEditor } from "@/Components/custom-ui/RichTextEditor";
import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { labelVariants } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

interface RichTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
}
export function RichTextField({
  value,
  onChange,
  className,
  disabled,
  error,
  label,
}: RichTextFieldProps) {
  return (
    <FieldContainer className={className}>
      <p
        className={cn(labelVariants(), {
          "text-destructive": error,
          "text-muted-foreground/80": disabled,
        })}
      >
        {label}
      </p>
      <RichTextEditor disabled={disabled} value={value} onChange={onChange} />
      <FieldError error={error} />
    </FieldContainer>
  );
}
