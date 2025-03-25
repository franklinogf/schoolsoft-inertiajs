import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Checkbox } from "@/Components/ui/checkbox";
import { YesNoEnum } from "@/Enums";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface CheckboxFieldProps {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
}
export function CheckboxField({
  error,
  label,
  disabled,
  className,
  value,
  onChange,
  description,
}: CheckboxFieldProps) {
  const id = useId();
  return (
    <FieldContainer
      className={cn(className, "flex gap-x-2", description ? "items-top" : "items-center")}
    >
      <Checkbox
        className="m-0"
        checked={value === YesNoEnum.YES}
        onCheckedChange={(checked) => {
          onChange && onChange(checked ? YesNoEnum.YES : YesNoEnum.NO);
        }}
        id={id}
      />
      <div className="space-y-1 leading-none">
        <FieldLabel disabled={disabled} error={error} id={id} label={label} />
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      <FieldError error={error} />
    </FieldContainer>
  );
}
