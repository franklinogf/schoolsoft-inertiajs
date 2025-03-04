import { Button, ButtonProps } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { LoadingTextSwap } from "../LoadingTextSwap";
interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
  loadingIcon?: React.ReactNode;
}
export default function SubmitButton({
  children,
  disabled,
  className,
  loadingIcon,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      className={cn("cursor-pointer", className, {
        "cursor-progress disabled:pointer-events-auto": disabled,
      })}
      disabled={disabled}
      {...props}
      type="submit"
    >
      <LoadingTextSwap loadingIcon={loadingIcon} isLoading={disabled}>
        {children}
      </LoadingTextSwap>
    </Button>
  );
}
