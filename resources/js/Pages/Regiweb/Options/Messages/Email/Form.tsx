import { InputField } from "@/Components/forms/inputs/InputField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { SelectedEnum } from "@/Pages/Regiweb/Options/Messages/Email/Index";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "sonner";

interface PageProps {
  students: Pick<Student, "ss" | "nombre" | "apellidos">[] | null;
  courses: Course[];
  admins: Admin[];
  data: string[];
  selected: SelectedEnum;
}
export default function Page({ students, courses, admins, selected, data: rowsId }: PageProps) {
  const { data, setData, processing, errors, post } = useForm({
    subject: "",
    message: "",
  });
  const to =
    selected === SelectedEnum.STUDENTS && students !== null && students?.length === 1
      ? `${students[0].nombre} ${students[0].apellidos}`
      : selected === SelectedEnum.STUDENTS && students !== null && students?.length > 1
        ? `${students[0].nombre} ${students[0].apellidos} y ${students.length} estudiantes más`
        : selected === SelectedEnum.COURSES && courses !== null
          ? courses.map((course) => course.curso).join(", ")
          : selected === SelectedEnum.ADMIN && admins !== null
            ? admins.map((admin) => admin.director).join(", ")
            : "";
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("regiweb.options.messages.email.send", { selected, to: rowsId }), {
      preserveState: true,
      onSuccess: () => {
        toast.success("Correo electrónico enviado", { duration: 5000 });
      },
      onError: () => {
        toast.error("Error al enviar el correo electrónico");
      },
    });
  };
  return (
    <RegiwebLayout title="Enviar de correo electrónico">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="pb-4 text-center text-2xl font-semibold">Enviar correo electrónico</h1>
        <div className="flex justify-end">
          <Button asChild variant="outline" className="mb-4">
            <Link href={route("regiweb.options.messages.email.index", { selected })}>Back</Link>
          </Button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="rounded-lg bg-white p-4 shadow">
            <InputField label="Para" name="to" disabled value={to} />
            <InputField
              value={data.subject}
              onChange={(value) => {
                setData("subject", value);
              }}
              error={errors.subject}
              label="Asunto"
              name="subject"
            />
            <TextareaField
              value={data.message}
              onChange={(value) => {
                setData("message", value);
              }}
              error={errors.message}
              label="Mensaje"
              name="message"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <SubmitButton disabled={processing}>Enviar</SubmitButton>
          </div>
        </form>
      </div>
    </RegiwebLayout>
  );
}
