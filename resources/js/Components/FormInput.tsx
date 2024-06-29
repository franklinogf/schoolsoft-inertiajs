import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useId } from "react";
import { useTranslation } from "react-i18next";
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
}
export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  ...props
}: FormInputProps) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <div className="space-y-0.5">
      {label ? <Label htmlFor={id}>{t(label)}</Label> : null}
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? t(placeholder) : undefined}
        {...props}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
