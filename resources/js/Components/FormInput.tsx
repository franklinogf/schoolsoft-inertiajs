import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useId } from "react";
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export default function FormInput({ label, value, onChange, error, ...props }: FormInputProps) {
  const id = useId();
  return (
    <div className="space-y-0.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={onChange} {...props} />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
