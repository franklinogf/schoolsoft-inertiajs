import { Skeleton } from "@/Components/ui/skeleton";

export function TableFormFallback() {
  return (
    <div>
      <Skeleton className="mb-2 h-10"></Skeleton>
      <div className="space-y-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-12 w-64"></Skeleton>
            {Array.from({ length: 10 }, (_, a) => (
              <Skeleton key={a} className="h-12 w-14"></Skeleton>
            ))}
            {Array.from({ length: 5 }, (_, a) => (
              <Skeleton key={a} className="h-12 w-12"></Skeleton>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
