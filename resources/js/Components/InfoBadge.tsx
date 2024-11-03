import { Badge, BadgeProps } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

interface InfoBadgeProps extends BadgeProps {
  label: string;
  value: string | number | undefined;
}
export function InfoBadge({ label, value, className, ...props }: InfoBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge {...props} className={cn("rounded-sm text-xs", className)}>
        {label}
      </Badge>
      <span className={cn("text-sm", className)}>{value}</span>
    </div>
  );
}
