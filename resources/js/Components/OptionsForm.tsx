import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

interface OptionsFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitting?: boolean;
  submitLabel: string;
}
export function OptionsForm({
  title,
  children,
  onSubmit,
  submitLabel,
  submitting,
}: OptionsFormProps) {
  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit();
          }}
        >
          {children}
          <div className="flex items-center justify-center">
            <SubmitButton isSubmitting={submitting}>{submitLabel}</SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
