import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent } from "@/Components/ui/card";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
            <FieldsGrid>
              <InputField
                label="Nombre"
                data={data}
                setData={setData}
                name="name"
                error={errors.name}
              />
              <InputField
                label="Apellido"
                data={data}
                setData={setData}
                name="lastname"
                error={errors.lastname}
              />
            </FieldsGrid>
            <InputField
              label="Correo Electrónico"
              type="email"
              data={data}
              setData={setData}
              name="email"
              error={errors.email}
            />
            <PhoneField
              label="Teléfono"
              data={data}
              setData={setData}
              name="phone"
              error={errors.phone}
            />
            <TextareaField
              label="Mensaje"
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
