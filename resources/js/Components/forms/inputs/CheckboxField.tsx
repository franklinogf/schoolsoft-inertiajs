import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Checkbox } from "@/Components/ui/checkbox";
import { YesNoEnum } from "@/Enums";
import { cn } from "@/lib/utils";
import { useId } from "react";
interface CheckboxFieldProps {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
}
export function CheckboxField({
  error,
  label,
  disabled,
  className,
  data,
  setData,
  name,
  description,
}: CheckboxFieldProps) {
  const id = useId();
  return (
    <FieldContainer
      className={cn(className, "flex space-x-2", description ? "items-top" : "items-center")}
    >
      <Checkbox
        name={name}
        checked={data[name] === YesNoEnum.SI}
        onCheckedChange={(checked) => {
          setData(name, checked ? YesNoEnum.SI : YesNoEnum.NO);
        }}
        id={id}
      />
      <div className="space-y-1 leading-none">
        <FieldLabel disabled={disabled} error={error} id={id} label={label} />
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <FieldError error={error} />
    </FieldContainer>
  );
}
