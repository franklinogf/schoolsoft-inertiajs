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
                data={data}
                setData={setData}
                name="name"
                error={errors.name}
              />
              <InputField
                label={t("input:lastname")}
                data={data}
                setData={setData}
                name="lastname"
                error={errors.lastname}
              />
            </FieldsGrid>
            <InputField
              label={t("input:email")}
              type="email"
              data={data}
              setData={setData}
              name="email"
              error={errors.email}
            />
            <PhoneField
              label={t("input:phone")}
              data={data}
              setData={setData}
              name="phone"
              error={errors.phone}
            />
            <TextareaField
              label={t("input:message")}
              data={data}
              setData={setData}
              name="message"
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
