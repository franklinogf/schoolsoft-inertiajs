import { Button, ButtonProps } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";
interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}
export default function SubmitButton({ children, disabled, ...props }: SubmitButtonProps) {
  return (
    <Button disabled={disabled} {...props} type="submit">
      {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
