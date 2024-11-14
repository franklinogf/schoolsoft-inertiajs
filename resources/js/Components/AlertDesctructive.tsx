import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { type Errors } from "@/types";

export function AlertDestructive({
  message,
  className,
}: {
  message: string | null | Errors;
  className?: string;
}) {
  if (
    message === null ||
    message === "" ||
    (typeof message === "object" && Object.keys(message).length === 0)
  ) {
    return null;
  }
  return (
    <Alert className={className} variant="destructive">
      <AlertCircle className="size-4" />
      <AlertTitle>{typeof message === "string" ? "Error" : "Errors"}</AlertTitle>
      <AlertDescription>
        {typeof message === "string"
          ? message
          : Object.values(message).map((m) => <p key={m}>- {m}</p>)}
      </AlertDescription>
    </Alert>
  );
}
