import { cn, formatDate, formatDateToString, formatStringToDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useId } from "react";
import PhoneInput, { type Value as E164Number } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { YesNoEnum } from "@/Enums";
import { useTranslation } from "react-i18next";
import { Checkbox } from "./ui/checkbox";
export type SelectItemType = { key: string; value: string };
export enum FormFieldType {
  INPUT,
  TEXTAREA,
  PHONE_INPUT,
  CHECKBOX,
  DATE_PICKER,
  SELECT,
  SKELETON,
}
type DefaultCustomFormFieldProps = {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};
type FormFieldSelectType = {
  fieldType: FormFieldType.SELECT;
  items: SelectItemType[];
};
type FormFieldInputType = {
  fieldType: FormFieldType.INPUT;
  type?: React.HTMLInputTypeAttribute;
};
type FormFieldDatePickerType = {
  fieldType: FormFieldType.DATE_PICKER;
};
type FormFieldPhoneType = {
  fieldType: FormFieldType.PHONE_INPUT;
};
type FormFieldCheckboxType = {
  fieldType: FormFieldType.CHECKBOX;
  description?: string;
};

type CustomFormFieldProps = DefaultCustomFormFieldProps &
  (
    | FormFieldSelectType
    | FormFieldInputType
    | FormFieldDatePickerType
    | FormFieldPhoneType
    | FormFieldCheckboxType
  );

function RenderInput({ props, id }: { props: CustomFormFieldProps; id: string }) {
  const { t } = useTranslation();
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <Input
          disabled={props.disabled}
          id={id}
          className={cn({
            "border-destructive ring-offset-destructive focus-visible:ring-destructive":
              props.error,
          })}
          type={props.type ?? "text"}
          value={props.data[props.name]}
          onChange={(e) => {
            props.setData(props.name, e.target.value);
          }}
          placeholder={props.placeholder}
        />
      );
    case FormFieldType.SELECT:
      return (
        <Select
          disabled={props.disabled}
          defaultValue={props.data[props.name]}
          onValueChange={(value) => {
            props.setData(props.name, value);
          }}
        >
          <SelectTrigger
            className={cn({
              "border-destructive ring-offset-destructive focus-visible:ring-destructive":
                props.error,
            })}
            id={id}
          >
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {props.items.map((item) => (
              <SelectItem key={item.key} value={item.key}>
                {t(item.value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case FormFieldType.DATE_PICKER:
      const selected = props.data[props.name];
      return (
        <Popover>
          <PopoverTrigger className="w-full" asChild>
            <Button
              disabled={props.disabled ? true : false}
              id={id}
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                {
                  "border-destructive ring-offset-destructive focus-visible:ring-destructive":
                    props.error,
                },
                { "hover:bg-background hover:text-foreground": props.disabled },
                !selected && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {selected ? (
                formatDate(selected)
              ) : (
                <span>{props.placeholder ?? t("Selecciona una fecha")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              selected={formatStringToDate(selected)}
              onSelect={(value) => {
                props.setData(props.name, formatDateToString(value));
              }}
              mode="single"
              initialFocus
              disabled={props.disabled}
            />
          </PopoverContent>
        </Popover>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          international
          countries={["US", "PR"]}
          countryCallingCodeEditable={false}
          placeholder={props.placeholder}
          defaultCountry="PR"
          disabled={props.disabled}
          value={props.data[props.name]}
          onChange={(value) => {
            props.setData(props.name, value as E164Number);
          }}
          className="input-phone"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className={cn("flex space-x-2", props.description ? "items-top" : "items-center")}>
          <Checkbox
            checked={props.data[props.name] === YesNoEnum.SI}
            onCheckedChange={(checked) => {
              props.setData(props.name, checked ? YesNoEnum.SI : YesNoEnum.NO);
            }}
            id={id}
          />
          <div className="grid gap-0.5 leading-none">
            <Label htmlFor={id}>{props.label}</Label>
            {props.description ? (
              <p className="text-sm text-muted-foreground">{props.description}</p>
            ) : null}
          </div>
        </div>
      );
    default:
      return null;
  }
}
export function CustomFormField(props: CustomFormFieldProps) {
  const { label, error, disabled, fieldType, className } = props;
  const id = useId();
  return (
    <div className={cn("space-y-0.5", className)}>
      {fieldType !== FormFieldType.CHECKBOX && label ? (
        <Label
          className={cn({ "text-destructive": error, "text-muted-foreground/80": disabled })}
          htmlFor={id}
        >
          {label}
        </Label>
      ) : null}
      <RenderInput id={id} props={props} />
      {error && <small className="text-destructive">{error}</small>}
    </div>
  );
}
