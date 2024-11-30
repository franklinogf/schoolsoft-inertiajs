import SubmitButton from "@/Components/forms/SubmitButton";

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
    <>
      <h1 className="page-primary-title">{title}</h1>
      <div className="mx-auto mt-8 w-full max-w-lg">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit();
          }}
        >
          {children}
          <div className="flex items-center justify-center">
            <SubmitButton disabled={submitting}>{submitLabel}</SubmitButton>
          </div>
        </form>
      </div>
    </>
  );
}
