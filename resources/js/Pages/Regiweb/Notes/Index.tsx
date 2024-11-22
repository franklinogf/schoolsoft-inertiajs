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
import { Teacher } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

type PageProps = PagePropsWithUser<Teacher>;

export default function Page({ auth: { user }, errors }: PageProps) {
  const { t } = useTranslation(["pages", "common", "input"]);
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
    <RegiwebLayout title={t("pages:regiweb.notes.index.meta.title")}>
      <h1 className="page-primary-title mt-4">{t("common:notes")}</h1>
      <div className="mt-2 flex flex-col items-center gap-8 px-2 pb-10">
        <div className="w-full max-w-xl rounded-md bg-secondary p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Button variant="outline" asChild>
              <Link href={route("regiweb.notes.attendance.entry")}>
                {t("pages:regiweb.notes.index.btn.attendance")}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={route("regiweb.notes.attendance.dailyReport")}>
                {t("pages:regiweb.notes.index.btn.dailyAttendanceReport")}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={route("regiweb.notes.attendance.report")}>
                {t("pages:regiweb.notes.index.btn.attendanceReport")}
              </Link>
            </Button>
            <Button variant="outline">{t("pages:regiweb.notes.index.btn.preschool")}</Button>
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
                  placeholder={t("input:placeholder.select.course")}
                  value={data.course}
                  onChange={(value) => setData("course", value)}
                  error={errors.course}
                  label={t("common:course.label")}
                  items={createSelectItemsFromArrayOfObjects(user.cursos, {
                    separator: " - ",
                    key: "curso",
                    values: ["curso", "descripcion"],
                  })}
                />
                <SelectField
                  placeholder={t("input:placeholder.select.trimester")}
                  value={data.trimester}
                  onChange={(value) => setData("trimester", value)}
                  label={t("common:trimester.label")}
                  items={TRIMESTER_SELECT}
                  error={errors.trimester}
                />
                <SelectField
                  placeholder={t("input:placeholder.select.page")}
                  value={data.page}
                  onChange={(value) => setData("page", value)}
                  label={t("common:pages.label")}
                  items={PAGES_SELECT}
                  error={errors.page}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <SubmitButton disabled={processing}>{t("common:btn.continue")}</SubmitButton>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RegiwebLayout>
  );
}
