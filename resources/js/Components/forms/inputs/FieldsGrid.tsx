import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputsGridVariants = cva("grid grid-cols-1 gap-2", {
  variants: {
    cols: {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
    },
  },
  defaultVariants: {
    cols: 2,
  },
});

interface InputsGridProps extends VariantProps<typeof inputsGridVariants> {
  children: React.ReactNode;
  className?: string;
}
export function FieldsGrid({ children, cols, className }: InputsGridProps) {
  return <div className={cn(inputsGridVariants({ cols, className }))}>{children}</div>;
}
