interface FieldErrorProps {
  error?: string;
}
export function FieldError({ error }: FieldErrorProps) {
  if (error) {
    return <div className="text-xs text-destructive">{error}</div>;
  }
  return null;
}
