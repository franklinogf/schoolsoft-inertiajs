import { FileField } from "@/Components/forms/inputs/FileField";
import { InputField } from "@/Components/forms/inputs/InputField";
import { RichTextField } from "@/Components/forms/inputs/RichTextField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent } from "@/Components/ui/card";
import { useTranslations } from "@/hooks/translations";
import { VisitOptions } from "@inertiajs/core";
import { useForm } from "@inertiajs/react";

export function MessageForm({
  onSubmit,
  to,
  extras,
}: {
  extras?: { [key: string]: any };
  to: string;
  onSubmit: (post: (url: string, options?: Omit<VisitOptions, "data">) => void) => void;
}) {
  const { data, setData, errors, processing, post } = useForm<{
    subject: string;
    message: string;
    files: string[];
    [key: string]: any;
  }>({
    subject: "",
    message: "",
    files: [],
    ...extras,
  });
  const { t } = useTranslations();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(post);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-2">
          <InputField label={t("Para")} name="to" disabled defaultValue={to} />
          <InputField
            required
            value={data.subject}
            onChange={(value) => {
              setData("subject", value);
            }}
            error={errors.subject}
            label={t("Asunto")}
            name="subject"
          />
          <RichTextField
            label={t("Mensaje")}
            value={data.message}
            onChange={(value) => {
              setData("message", value);
            }}
            error={errors.message}
          />
          <FileField
            label={t("Adjuntos")}
            allowMultiple
            onChange={(values) => {
              setData("files", values);
            }}
          />
        </CardContent>
      </Card>
      <div className="mt-2 flex justify-center">
        <SubmitButton disabled={processing}>{t("Enviar")}</SubmitButton>
      </div>
    </form>
  );
}
