import { PhoneInput } from "@/Components/custom-ui/PhoneInput";
import { FieldContainer } from "@/Components/forms/inputs/FieldContainer";
import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { useId } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
interface PhoneFieldProps {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export function PhoneField({
  error,
  label,
  disabled,
  className,
  placeholder,
  value,
  onChange,
}: PhoneFieldProps) {
  const id = useId();
  return (
    <FieldContainer className={className}>
      <FieldLabel disabled={disabled} error={error} id={id} label={label} />
      <PhoneInput
        countrySelectProps={{ id: `${id}-country` }}
        numberInputProps={{ id, className: "bg-input" }}
        international
        countryCallingCodeEditable={false}
        placeholder={placeholder}
        defaultCountry="PR"
        disabled={disabled}
        value={value}
        onChange={(value) => {
          onChange?.(formatPhoneNumberIntl(value));
        }}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
