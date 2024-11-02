interface FieldErrorProps {
  error?: string;
}
export function FieldError({ error }: FieldErrorProps) {
  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  return null;
}
