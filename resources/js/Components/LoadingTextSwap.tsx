import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export function LoadingTextSwap({
  isLoading,
  children,
  loadingIcon,
}: {
  isLoading?: boolean;
  children: React.ReactNode;
  loadingIcon?: React.ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
          isLoading ? "visible" : "invisible",
        )}
      >
        {loadingIcon ?? <Loader2Icon className="animate-spin" />}
      </div>
    </div>
  );
}
