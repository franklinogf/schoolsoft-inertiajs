import { InfoBadge } from "@/Components/InfoBadge";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate } from "@/lib/utils";
import type { PagePropsWithUser } from "@/types";
import type { Teacher } from "@/types/Teacher";
import { Head } from "@inertiajs/react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { PAGES, TRIMESTERS } from "@/Constants";
import { Info } from "lucide-react";
import { AttendaceForm } from "./_components/AttendanceForm";
import { DefaultForm } from "./_components/DefaultForm";
import { ExamForm } from "./_components/ExamForm";
import { GradesValues, ValuesForm } from "./_components/ValuesForm";
import { OptionsContext } from "./_context/OptionsContext";
import {
  StudentsAttendanceGrades,
  StudentsDefaultGrades,
  StudentsExamGrades,
  StudentsGrades,
} from "./_types/studentsGrades";

interface PageProps extends PagePropsWithUser<Teacher> {
  course: string;
  page: PagesEnum;
  trimester: TrimesterEnum;
  studentsGrades: StudentsGrades[];
  initialDate: string;
  finalDate: string;
  isLetter: boolean;
  isPercent: boolean;
  canEnd: boolean;
  hasEnded: boolean;
  amountOfGrades: number | null;
  columns: string[] | null;
  gradesValues: GradesValues | null;
  gradesValuesId: number | null;
}
export default function Show({
  auth,
  course,
  page,
  trimester,
  studentsGrades,
  initialDate,
  finalDate,
  isLetter,
  isPercent,
  canEnd,
  hasEnded,
  amountOfGrades,
  columns,
  gradesValues,
  gradesValuesId,
}: PageProps) {
  const [convert, setConvert] = useState(false);

  const [values, setValues] = useState(gradesValues);
  const { t } = useTranslation();

  function handleValueChange(valueKey: string, value: string) {
    if (!values) return;
    const updatedValues = Object.entries(values).reduce((acc, [key, val]) => {
      if (key === valueKey) {
        return { ...acc, [key]: value };
      }
      return { ...acc, [key]: val };
    }, {});

    setValues(updatedValues);
  }
  return (
    <>
      <Head title={t("Entrada de notas")} />
      <RegiwebLayout user={auth.user} title={t("Inicio")}>
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("Información")}</CardTitle>
              <CardDescription hidden></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <InfoBadge label={t("Curso")} value={course} />
                <InfoBadge label={t("Trimestre")} value={TRIMESTERS[trimester]} />
                <InfoBadge label={t("Entrando notas a")} value={PAGES[page]} />
                <InfoBadge label={t("Total de estudiantes")} value={studentsGrades.length} />
                <InfoBadge
                  label={t("Fecha de inicio")}
                  value={formatDate(initialDate, { dateStyle: "long" })}
                />
                <InfoBadge
                  label={t("Fecha de cierre")}
                  value={formatDate(finalDate, { dateStyle: "long" })}
                />
                <InfoBadge
                  label={t("Tipo de nota")}
                  value={isPercent ? t("Porciento") : t("Suma")}
                />
              </div>
            </CardContent>
          </Card>
          {(page === PagesEnum.GRADES || page === PagesEnum.SUMMER_GRADES) && (
            <Card>
              <CardHeader>
                <CardTitle>{t("Opciones")}</CardTitle>
                <CardDescription hidden></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SwitchCheckbox
                    checked={isLetter}
                    label={t("Convertir a letras")}
                    description={
                      page === PagesEnum.GRADES
                        ? t("Esta opción es aplicada a la columna Nota 9 exclusivamente")
                        : t("Esta opción es aplicada a la columna Nota 7 exclusivamente")
                    }
                  />
                  <SwitchCheckbox
                    checked={convert}
                    onChange={setConvert}
                    label={t("Conversión")}
                    description={t("Esta opción convierte numeros a letras")}
                  />
                  {canEnd && (
                    <SwitchCheckbox
                      checked={hasEnded}
                      label={t("Notificación")}
                      description={t("Cuando el trimestre termine marque esta opción")}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {page !== PagesEnum.GRADES &&
          page !== PagesEnum.SUMMER_GRADES &&
          page !== PagesEnum.FINAL_EXAM &&
          page !== PagesEnum.CONDUCT_ATTENDANCE ? (
            <Alert variant="warning">
              <Info className="size-4" />
              <AlertTitle>{t("Importante")}</AlertTitle>
              <AlertDescription>
                Recuerda ir a la pagina de notas y darle a grabar para tener los promédios
                correctos.
              </AlertDescription>
            </Alert>
          ) : null}
        </section>
        <section className="mt-8">
          <OptionsContext.Provider value={{ page, trimester, course }}>
            {values &&
            amountOfGrades &&
            (page === PagesEnum.GRADES ||
              page === PagesEnum.SUMMER_GRADES ||
              page === PagesEnum.SHORT_TESTS ||
              page === PagesEnum.DAILY_WORKS ||
              page === PagesEnum.NOTEBOOKS_WORKS) ? (
              <DefaultForm
                values={values}
                amountOfGrades={amountOfGrades}
                columns={columns}
                convert={convert}
                students={studentsGrades as StudentsDefaultGrades[]}
              />
            ) : page === PagesEnum.CONDUCT_ATTENDANCE ? (
              <AttendaceForm students={studentsGrades as StudentsAttendanceGrades[]} />
            ) : page === PagesEnum.FINAL_EXAM ? (
              <ExamForm students={studentsGrades as StudentsExamGrades[]} />
            ) : null}
          </OptionsContext.Provider>
        </section>
        {values && gradesValuesId && amountOfGrades && (
          <section className="mt-8">
            <ValuesForm
              values={values}
              id={gradesValuesId}
              amoutOfGrades={amountOfGrades}
              onValueChange={handleValueChange}
            />
          </section>
        )}
      </RegiwebLayout>
    </>
  );
}

function SwitchCheckbox({
  checked,
  description,
  label,
  disabled,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="items-top flex gap-2">
      <Switch id={id} onCheckedChange={onChange} checked={checked} disabled={disabled} />
      <div className="space-y-1 leading-none">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
