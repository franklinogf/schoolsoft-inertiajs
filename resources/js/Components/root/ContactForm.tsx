import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent } from "@/Components/ui/card";
import { useTranslations } from "@/hooks/translations";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

export function ContactForm() {
  usePage<PageProps>().props.flash.success;
  const { t } = useTranslations();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    lastname: "",
    message: "",
    name: "",
    phone: "",
  });
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post(route("contact.submit"), { onSuccess: () => reset() });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="mx-auto mt-4 max-w-xl">
        <CardContent className="py-4">
          <form onSubmit={onSubmit} className="space-y-6">
            <FieldsGrid>
              <InputField
                autoComplete="name"
                label={t("Nombre")}
                value={data.name}
                onChange={(value) => setData("name", value)}
                error={errors.name}
              />
              <InputField
                autoComplete="family-name"
                label={t("Apellido")}
                value={data.lastname}
                onChange={(value) => setData("lastname", value)}
                error={errors.lastname}
              />
            </FieldsGrid>
            <InputField
              autoComplete="email"
              label={t("Correo electrónico")}
              value={data.email}
              onChange={(value) => setData("email", value)}
              type="email"
              error={errors.email}
            />
            <PhoneField
              label={t("Teléfono")}
              value={data.phone}
              onChange={(value) => setData("phone", value)}
              error={errors.phone}
            />
            <TextareaField
              value={data.message}
              onChange={(value) => setData("message", value)}
              label={t("Mensaje")}
              placeholder={t("Escribe un mensaje") + "..."}
              error={errors.message}
            />
            <div className="grid w-full">
              <SubmitButton disabled={processing}>{t("Enviar mensaje")}</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
