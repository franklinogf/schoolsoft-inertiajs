import { Badge, BadgeProps } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

interface InfoBadgeProps extends BadgeProps {
  label: string;
  value: string | number;
}
export function InfoBadge({ label, value, className, ...props }: InfoBadgeProps) {
  return (
    <div className="flex gap-2">
      <Badge {...props} className={cn("rounded-sm", className)}>
        {label}
      </Badge>
      <span>{value}</span>
    </div>
  );
}
