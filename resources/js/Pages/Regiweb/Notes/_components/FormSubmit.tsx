import SubmitButton from "@/Components/forms/SubmitButton";
import { useTranslation } from "react-i18next";

export function FormSubmit({ isSubmitting }: { isSubmitting: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center">
      <SubmitButton size="lg" disabled={isSubmitting} className="mt-4">
        {t("Guardar")}
      </SubmitButton>
    </div>
  );
}
