import { cn } from "@/lib/utils";

export function InputsGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("grid grid-cols-1 gap-2 md:grid-cols-2", className)}>{children}</div>;
}
