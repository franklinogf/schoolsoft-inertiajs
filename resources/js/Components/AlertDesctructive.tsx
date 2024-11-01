import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { type Errors } from "@/types";

export function AlertDestructive({ message }: { message: string | null | Errors }) {
  if (message === null) {
    return null;
  }
  return (
    <Alert variant="destructive">
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
