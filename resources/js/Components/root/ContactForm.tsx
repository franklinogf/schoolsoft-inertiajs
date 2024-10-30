// import { sendContactEmail } from "@/actions";
import { Card, CardContent } from "@/Components/ui/card";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CustomFormField, FormFieldType } from "../CustomFormField";
import { InputsGrid } from "../InputsGrid";
import SubmitButton from "../SubmitButton";

export function ContactForm() {
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
        console.log(data);
        toast.success("Mensaje enviado con éxito");
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
            <InputsGrid>
              <CustomFormField
                label="Nombre"
                fieldType={FormFieldType.INPUT}
                data={data}
                setData={setData}
                name="name"
                error={errors.name}
              />
              <CustomFormField
                label="Apellido"
                fieldType={FormFieldType.INPUT}
                data={data}
                setData={setData}
                name="lastname"
                error={errors.lastname}
              />
            </InputsGrid>
            <CustomFormField
              label="Correo Electrónico"
              fieldType={FormFieldType.INPUT}
              type="email"
              data={data}
              setData={setData}
              name="email"
              error={errors.email}
            />
            <CustomFormField
              label="Teléfono"
              fieldType={FormFieldType.PHONE_INPUT}
              data={data}
              setData={setData}
              name="phone"
              error={errors.phone}
            />
            <CustomFormField
              label="Mensaje"
              fieldType={FormFieldType.TEXTAREA}
              data={data}
              setData={setData}
              name="message"
              placeholder="Escribenos tu mensaje..."
              error={errors.message}
            />
            <div className="grid w-full">
              <SubmitButton disabled={processing}>Enviar Mensaje</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
