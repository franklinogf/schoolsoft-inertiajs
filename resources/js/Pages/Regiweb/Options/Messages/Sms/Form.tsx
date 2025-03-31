import { InputField } from "@/Components/forms/inputs/InputField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { PageTitle } from "@/Components/PageTitle";
import { Card, CardContent } from "@/Components/ui/card";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { createPhoneEmail } from "@/lib/utils";
import { PhoneCompany } from "@/types";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";
import { PhoneIcon } from "lucide-react";
import { FormEvent } from "react";
import { SmsSelectedEnum } from "./Index";

interface PageProps {
  students: Pick<Student, "ss" | "nombre" | "apellidos">[] | null;
  courses: Course[] | null;
  data: string[];
  selected: SmsSelectedEnum;
  phone: string | null;
  company: PhoneCompany | null;
}
export default function Page({
  students,
  courses,
  selected,
  data: rowsId,
  phone,
  company,
}: PageProps) {
  const { t, tChoice } = useTranslations();
  const { data, setData, processing, errors, post } = useForm({
    subject: "",
    message: "",
  });

  const to =
    selected === SmsSelectedEnum.STUDENTS && students !== null && students?.length === 1
      ? `${students[0]?.nombre} ${students[0]?.apellidos}`
      : selected === SmsSelectedEnum.STUDENTS && students !== null && students?.length > 1
        ? `${students[0]?.nombre} ${students[0]?.apellidos} ` +
          tChoice("y :amount estudiante más|y :amount estudiantes más", students.length - 1, {
            amount: students.length - 1,
          })
        : selected === SmsSelectedEnum.COURSES && courses !== null
          ? courses.map((course) => course.curso).join(", ")
          : selected === SmsSelectedEnum.Individual && phone !== null && company !== null
            ? `${phone} (${company})`
            : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const to =
      selected === SmsSelectedEnum.Individual ? [createPhoneEmail(phone!, company!)] : rowsId;
    post(route("regiweb.options.messages.sms.send", { selected, to }), {
      preserveState: true,
    });
  };

  return (
    <RegiwebLayout title={t("Enviar SMS")}>
      <div className="mx-auto w-full max-w-2xl">
        <PageTitle backLink={route("regiweb.options.messages.sms.index", { selected })}>
          {t("Enviar SMS")}
        </PageTitle>
        <form onSubmit={onSubmit}>
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
              <TextareaField
                required
                label={t("Mensaje")}
                value={data.message}
                onChange={(value) => {
                  setData("message", value);
                }}
                error={errors.message}
              />
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-center">
            <SubmitButton
              loadingIcon={<PhoneIcon className="animate-bounce" />}
              isSubmitting={processing}
            >
              {t("Enviar")}
            </SubmitButton>
          </div>
        </form>
      </div>
    </RegiwebLayout>
  );
}
