import { AlertDestructive } from "@/Components/AlertDesctructive";
import { SelectField } from "@/Components/forms/inputs/SelectField";

import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import {
  createSelectItemsFromArrayOfObjects,
  PAGES_SELECT,
  TRIMESTER_SELECT,
} from "@/Constants/FormSelects";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Student } from "@/types/student";
import { Teacher } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { AttendanceDailyReportModalForm } from "./_components/AttendanceDailyReportModalForm";
import { AttendanceReportModalForm } from "./_components/AttendanceReportModalForm";

type PageProps = PagePropsWithUser<Teacher> & {
  students: Student[];
};

export default function Page({ auth: { user }, errors: pageErrors, students }: PageProps) {
  const { t } = useTranslations();
  const { data, setData, get, processing, errors } = useForm({
    course: user.cursos?.[0]?.curso ?? "",
    trimester: TRIMESTER_SELECT[0]?.value,
    page: PAGES_SELECT[0]?.value,
  });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    get(route("regiweb.notes.show"));
  }
  return (
    <RegiwebLayout title={t("Notas")}>
      <h1 className="page-primary-title mt-4">{t("Notas")}</h1>
      <div className="mt-2 flex flex-col items-center gap-8 px-2 pb-10">
        <div className="bg-secondary w-full max-w-xl rounded-md p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button variant="outline" asChild>
              <Link href={route("regiweb.notes.attendance.entry")}>
                {t("Entrada de Asistencia")}
              </Link>
            </Button>
            <AttendanceDailyReportModalForm students={students} />
            <AttendanceReportModalForm courses={user.cursos} />
            <Button variant="outline">{t("Preescolar")}</Button>
          </div>
        </div>
        <form className="w-full max-w-lg" onSubmit={submit}>
          <Card>
            <CardHeader>
              <AlertDestructive message={pageErrors} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SelectField
                  placeholder={t("Selecciona el curso")}
                  value={data.course}
                  onChange={(value) => setData("course", value)}
                  error={errors.course}
                  label={t("Curso")}
                  items={createSelectItemsFromArrayOfObjects(user.cursos, {
                    separator: " - ",
                    value: "curso",
                    labels: ["curso", "descripcion"],
                  })}
                />
                <SelectField
                  placeholder={t("Selecciona el trimestre")}
                  value={data.trimester}
                  onChange={(value) => setData("trimester", value)}
                  label={t("Trimestre")}
                  items={TRIMESTER_SELECT}
                  error={errors.trimester}
                />
                <SelectField
                  placeholder={t("Selecciona la página")}
                  value={data.page}
                  onChange={(value) => setData("page", value)}
                  label={t("Página")}
                  items={PAGES_SELECT}
                  error={errors.page}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <SubmitButton isSubmitting={processing}>{t("Continuar")}</SubmitButton>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RegiwebLayout>
  );
}
