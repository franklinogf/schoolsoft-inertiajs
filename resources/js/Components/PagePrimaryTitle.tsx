import { cn } from "@/lib/utils";

export default function PagePrimaryTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("mx-auto max-w-2xl text-balance text-center text-4xl font-bold", className)}>
      {children}
    </h1>
  );
}
