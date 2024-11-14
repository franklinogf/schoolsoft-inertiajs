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
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/Teacher";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

type PageProps = PagePropsWithUser<Teacher>;

export default function Page({ auth, errors }: PageProps) {
  const { t } = useTranslation();
  const { data, setData, get, processing } = useForm({
    course: "",
    trimester: "",
    page: "",
  });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    get(route("regiweb.notes.show"));
  }
  return (
    <RegiwebLayout user={auth.user} title={t("Inicio")}>
      <h1 className="page-primary-title mt-4">{t("Notas")}</h1>
      <div className="mt-2 flex flex-col items-center gap-8 px-2 pb-10">
        <div className="w-full max-w-xl rounded-md bg-secondary p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button variant="outline">{t("Entrada de asistencia")}</Button>
            <Button variant="outline">{t("Reporte de asistencia diaria")}</Button>
            <Button variant="outline">{t("Reporte de asistencias")}</Button>
            <Button variant="outline">{t("Pre escuela")}</Button>
          </div>
        </div>
        <form className="w-full max-w-lg" onSubmit={submit}>
          <Card>
            <CardHeader>
              <AlertDestructive message={errors} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SelectField
                  placeholder="Selecciona el curso"
                  data={data}
                  setData={setData}
                  name="course"
                  label={t("Curso")}
                  items={createSelectItemsFromArrayOfObjects(auth.user.cursos, {
                    separator: " - ",
                    key: "curso",
                    values: ["curso", "descripcion"],
                  })}
                />
                <SelectField
                  placeholder="Selecciona el trimestre"
                  data={data}
                  setData={setData}
                  name="trimester"
                  label={t("Trimestre")}
                  items={TRIMESTER_SELECT}
                />
                <SelectField
                  placeholder="Selecciona la pagína"
                  data={data}
                  setData={setData}
                  name="page"
                  label={t("Pagína")}
                  items={PAGES_SELECT}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <SubmitButton disabled={processing}>{t("Continuar")}</SubmitButton>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RegiwebLayout>
  );
}
