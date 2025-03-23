import { FileField } from "@/Components/forms/inputs/FileField";
import { InputField } from "@/Components/forms/inputs/InputField";
import { RichTextField } from "@/Components/forms/inputs/RichTextField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { PageTitle } from "@/Components/PageTitle";
import { Card, CardContent } from "@/Components/ui/card";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { EmailSelectedEnum } from "@/Pages/Regiweb/Options/Messages/Email/Index";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";
import { MailIcon } from "lucide-react";
import { FormEvent } from "react";

interface PageProps {
  students: Pick<Student, "ss" | "nombre" | "apellidos">[] | null;
  courses: Course[];
  admins: Admin[];
  data: string[];
  selected: EmailSelectedEnum;
}
export default function Page({ students, courses, admins, selected, data: rowsId }: PageProps) {
  const { t, tChoice } = useTranslations();
  const { data, setData, processing, errors, post } = useForm<{
    subject: string;
    message: string;
    files: string[];
  }>({
    subject: "",
    message: "",
    files: [],
  });

  const to =
    selected === EmailSelectedEnum.STUDENTS && students !== null && students?.length === 1
      ? `${students[0]?.nombre} ${students[0]?.apellidos}`
      : selected === EmailSelectedEnum.STUDENTS && students !== null && students?.length > 1
        ? `${students[0]?.nombre} ${students[0]?.apellidos} ` +
          tChoice("y :amount estudiante más|y :amount estudiantes más", students.length - 1, {
            amount: students.length - 1,
          })
        : selected === EmailSelectedEnum.COURSES && courses !== null
          ? courses.map((course) => course.curso).join(", ")
          : selected === EmailSelectedEnum.ADMIN && admins !== null
            ? admins.map((admin) => admin.director).join(", ")
            : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route("regiweb.options.messages.email.send", { selected, to: rowsId }), {
      preserveState: true,
    });
  };

  return (
    <RegiwebLayout title={t("Enviar correo electrónico")}>
      <div className="mx-auto w-full max-w-2xl">
        <PageTitle backLink={route("regiweb.options.messages.email.index", { selected })}>
          {t("Enviar correo electrónico")}
        </PageTitle>

        <form onSubmit={onSubmit}>
          <Card>
            <CardContent className="space-y-2">
              <InputField label={t("Para")} name="to" disabled value={to} />
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
          <div className="mt-4 flex justify-center">
            <SubmitButton
              loadingIcon={<MailIcon className="animate-bounce" />}
              disabled={processing}
            >
              {t("Enviar")}
            </SubmitButton>
          </div>
        </form>
      </div>
    </RegiwebLayout>
  );
}
