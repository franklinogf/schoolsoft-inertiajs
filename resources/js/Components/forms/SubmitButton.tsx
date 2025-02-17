import { Button, ButtonProps } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}
export default function SubmitButton({
  children,
  disabled,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      className={cn("cursor-pointer", className)}
      disabled={disabled}
      {...props}
      type="submit"
    >
      {disabled ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  );
}
