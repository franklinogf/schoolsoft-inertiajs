import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent } from "@/Components/ui/card";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function ContactForm() {
  const { t } = useTranslation(["home", "input"]);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    lastname: "",
    message: "",
    name: "",
    phone: "",
  });
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post(route("contact.submit"), {
      onSuccess: () => {
        toast.success(t("home:contact.success"));
        reset();
      },
    });
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
                label={t("input:name")}
                value={data.name}
                onChange={(value) => setData("name", value)}
                error={errors.name}
              />
              <InputField
                label={t("input:lastname")}
                value={data.lastname}
                onChange={(value) => setData("lastname", value)}
                error={errors.lastname}
              />
            </FieldsGrid>
            <InputField
              label={t("input:email")}
              value={data.email}
              onChange={(value) => setData("email", value)}
              type="email"
              error={errors.email}
            />
            <PhoneField
              label={t("input:phone")}
              value={data.phone}
              onChange={(value) => setData("phone", value)}
              error={errors.phone}
            />
            <TextareaField
              value={data.message}
              onChange={(value) => setData("message", value)}
              label={t("input:message")}
              placeholder={t("input:defaultPlaceholders.message") + "..."}
              error={errors.message}
            />
            <div className="grid w-full">
              <SubmitButton disabled={processing}>{t("home:contact.btn")}</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
