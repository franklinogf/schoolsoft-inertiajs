import { CustomFormField, FormFieldType, SelectItemType } from "@/Components/CustomFormField";
import SubmitButton from "@/Components/SubmitButton";
import { Button } from "@/Components/ui/button";
import { PAGES_SELECT, TRIMESTER_SELECT } from "@/Constants/FormSelects";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/auth";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

type PageProps = PagePropsWithUser<Teacher> & {
  teacherGrades: SelectItemType[];
};
export default function IndexPage({ auth, teacherGrades }: PageProps) {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm({
    grade: "",
    trimester: "",
    page: "",
  });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("regiweb.notes.index.submit"));
  }
  return (
    <RegiwebLayout user={auth.user} title={t("Inicio")}>
      <h1 className="page-primary-title mt-4">{t("Notas")}</h1>
      <div className="mt-2 flex flex-col items-center gap-8 px-2 pb-10">
        <div className="w-full max-w-xl rounded-md bg-secondary p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button className="bg-transparent text-secondary-foreground" variant="outline">
              {t("Entrada de asistencia")}
            </Button>
            <Button className="bg-transparent text-secondary-foreground" variant="outline">
              {t("Reporte de asistencia diaria")}
            </Button>
            <Button className="bg-transparent text-secondary-foreground" variant="outline">
              {t("Reporte de asistencias")}
            </Button>
            <Button className="bg-transparent text-secondary-foreground" variant="outline">
              {t("Pre escuela")}
            </Button>
          </div>
        </div>
        <div className="w-full max-w-lg rounded-md bg-background p-4 shadow">
          <form onSubmit={submit}>
            <div className="space-y-4">
              <CustomFormField
                placeholder="Selecciona el grado"
                fieldType={FormFieldType.SELECT}
                data={data}
                setData={setData}
                name="grade"
                label={t("Grado")}
                items={teacherGrades}
                error={errors.grade}
              />
              <CustomFormField
                placeholder="Selecciona el trimestre"
                fieldType={FormFieldType.SELECT}
                data={data}
                setData={setData}
                name="trimester"
                label={t("Trimestre")}
                items={TRIMESTER_SELECT}
                error={errors.trimester}
              />
              <CustomFormField
                placeholder="Selecciona la pagína"
                fieldType={FormFieldType.SELECT}
                data={data}
                setData={setData}
                name="page"
                label={t("Pagína")}
                items={PAGES_SELECT}
                error={errors.page}
              />
              <div className="flex justify-center">
                <SubmitButton disabled={processing}>{t("Continuar")}</SubmitButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </RegiwebLayout>
  );
}
