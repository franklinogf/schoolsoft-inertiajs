import { InputField } from "@/Components/forms/inputs/InputField";
import { RichTextField } from "@/Components/forms/inputs/RichTextField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { SelectedEnum } from "@/Pages/Regiweb/Options/Messages/Email/Index";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { MailIcon } from "lucide-react";
import { FormEvent } from "react";

interface PageProps {
  students: Pick<Student, "ss" | "nombre" | "apellidos">[] | null;
  courses: Course[];
  admins: Admin[];
  data: string[];
  selected: SelectedEnum;
}
export default function Page({ students, courses, admins, selected, data: rowsId }: PageProps) {
  const { t, tChoice } = useTranslations();
  const { data, setData, processing, errors, post } = useForm({
    subject: "",
    message: "",
    text: "",
  });

  const to =
    selected === SelectedEnum.STUDENTS && students !== null && students?.length === 1
      ? `${students[0].nombre} ${students[0].apellidos}`
      : selected === SelectedEnum.STUDENTS && students !== null && students?.length > 1
        ? `${students[0].nombre} ${students[0].apellidos} ` +
          tChoice("and :amount more student|and :amount more students", students.length - 1, {
            amount: students.length - 1,
          })
        : selected === SelectedEnum.COURSES && courses !== null
          ? courses.map((course) => course.curso).join(", ")
          : selected === SelectedEnum.ADMIN && admins !== null
            ? admins.map((admin) => admin.director).join(", ")
            : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    // return;
    post(route("regiweb.options.messages.email.send", { selected, to: rowsId }), {
      preserveState: true,
    });
  };

  return (
    <RegiwebLayout title={t("Send email")}>
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-2 text-center text-2xl font-semibold">{t("Send email")}</h1>
        <div className="flex justify-end">
          <Button asChild variant="outline" className="mb-4">
            <Link href={route("regiweb.options.messages.email.index", { selected })}>
              {t("Go back")}
            </Link>
          </Button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-2 rounded-lg bg-white p-4 shadow">
            <InputField label={t("To")} name="to" disabled value={to} />
            <InputField
              required
              value={data.subject}
              onChange={(value) => {
                setData("subject", value);
              }}
              error={errors.subject}
              label={t("Subject")}
              name="subject"
            />
            <RichTextField
              label={t("Message")}
              value={data.message}
              onChange={(value) => {
                setData("message", value);
              }}
              error={errors.message}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <SubmitButton
              loadingIcon={<MailIcon className="animate-bounce" />}
              disabled={processing}
            >
              {t("Send")}
            </SubmitButton>
          </div>
        </form>
      </div>
    </RegiwebLayout>
  );
}
