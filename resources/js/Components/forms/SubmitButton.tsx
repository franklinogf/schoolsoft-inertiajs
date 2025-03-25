import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { LoadingTextSwap } from "../LoadingTextSwap";
interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  loadingIcon?: React.ReactNode;
  isSubmitting: boolean;
}
export default function SubmitButton({
  children,
  isSubmitting,
  className,
  loadingIcon,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      className={cn("cursor-pointer", className, {
        "cursor-progress disabled:pointer-events-auto": isSubmitting,
      })}
      disabled={isSubmitting || disabled}
      {...props}
      type="submit"
    >
      <LoadingTextSwap loadingIcon={loadingIcon} isLoading={isSubmitting}>
        {children}
      </LoadingTextSwap>
    </Button>
  );
}
