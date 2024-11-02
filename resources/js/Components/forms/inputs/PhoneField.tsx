import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { useId } from "react";
import PhoneInput, { type Value as E164Number } from "react-phone-number-input";
import "react-phone-number-input/style.css";
interface PhoneFieldProps {
  data: any;
  setData: (key: string, value: any) => void;
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}
export function PhoneField({
  error,
  label,
  disabled,
  className,
  data,
  setData,
  name,
  placeholder,
}: PhoneFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <PhoneInput
        countrySelectProps={{ id: `${id}-country` }}
        numberInputProps={{ id }}
        international
        countries={["US", "PR"]}
        countryCallingCodeEditable={false}
        placeholder={placeholder}
        defaultCountry="PR"
        disabled={disabled}
        value={data[name]}
        onChange={(value) => {
          setData(name, value as E164Number);
        }}
        className="input-phone"
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
