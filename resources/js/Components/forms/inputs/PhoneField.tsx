import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { useId } from "react";
import PhoneInput, { Country, type Value as E164Number } from "react-phone-number-input";
import "react-phone-number-input/style.css";
interface PhoneFieldProps {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  value?: string | E164Number;
  countries?: Country[];
  onChange?: (value: string) => void;
}
export function PhoneField({
  error,
  label,
  disabled,
  className,
  placeholder,
  value,
  countries = ["US", "PR"],
  onChange,
}: PhoneFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <PhoneInput
        countrySelectProps={{ id: `${id}-country` }}
        numberInputProps={{ id }}
        international
        countries={countries}
        countryCallingCodeEditable={false}
        placeholder={placeholder}
        defaultCountry="PR"
        disabled={disabled}
        value={value}
        onChange={(value) => {
          onChange && onChange(value as E164Number);
        }}
        className="input-phone"
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
