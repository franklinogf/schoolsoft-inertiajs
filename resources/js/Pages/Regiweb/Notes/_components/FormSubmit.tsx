import SubmitButton from "@/Components/forms/SubmitButton";
import { useTranslations } from "@/hooks/translations";

export function FormSubmit({ isSubmitting }: { isSubmitting: boolean }) {
  const { t } = useTranslations();
  return (
    <div className="flex justify-center">
      <SubmitButton size="lg" disabled={isSubmitting} className="mt-4">
        {t("Guardar")}
      </SubmitButton>
    </div>
  );
}
