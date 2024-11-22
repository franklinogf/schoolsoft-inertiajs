import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import React, { useId } from "react";
export type SelectItemType = { key: string; value: string };

type DefaultSelectFieldProps = {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  clearable?: boolean;
  value: string;
  onChange: (value: string) => void;
};

type SelectFieldPropsWithItems = DefaultSelectFieldProps & {
  items: SelectItemType[];
  children?: never;
};
type SelectFieldPropsWithChildren = DefaultSelectFieldProps & {
  items?: never;
  children: React.ReactNode;
};
type SelectFieldProps = SelectFieldPropsWithItems | SelectFieldPropsWithChildren;

export function SelectField({
  error,
  label,
  disabled,
  className,
  placeholder,
  items,
  children,
  value,
  clearable = false,
  onChange,
}: SelectFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <Select disabled={disabled} defaultValue={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className={cn({
            "border-destructive ring-offset-destructive focus-visible:ring-destructive": error,
          })}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items
            ? items.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.value}
                </SelectItem>
              ))
            : children}
          {clearable && (
            <>
              <SelectSeparator />
              <Button
                size="sm"
                onClick={() => {
                  onChange("");
                }}
                className="w-full"
                variant="secondary"
              >
                Deseleccionar
              </Button>
            </>
          )}
        </SelectContent>
      </Select>
      <FieldError error={error} />
    </FieldContainer>
  );
}
