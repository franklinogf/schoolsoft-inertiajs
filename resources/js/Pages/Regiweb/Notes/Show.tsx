import { InfoBadge } from "@/Components/InfoBadge";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";

import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";

import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate } from "@/lib/utils";
import { useId, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { PAGES, TRIMESTERS } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import { Deferred } from "@inertiajs/react";
import { Info } from "lucide-react";
import { AttendanceTableForm } from "./_components/AttendanceTableForm";
import { DefaultTableForm } from "./_components/DefaultTableForm";
import { ExamForm } from "./_components/ExamTableForm";
import { TableFormFallback } from "./_components/TableFormFallback";
import { GradesValues, ValuesForm } from "./_components/ValuesForm";
import { OptionsContext } from "./_context/OptionsContext";
import {
  StudentsAttendanceGrades,
  StudentsDefaultGrades,
  StudentsExamGrades,
  StudentsGrades,
} from "./_types/studentsGrades";

interface PageProps {
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
export default function Page({
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
  const { t } = useTranslations();

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
    <RegiwebLayout title={t("Entrada de notas")}>
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
              <InfoBadge label={t("Añadiendo notas a")} value={PAGES[page]} />
              <Deferred
                data="studentsGrades"
                fallback={<InfoBadge label={t("Total de estudiantes")} value={0} />}
              >
                <InfoBadge label={t("Total de estudiantes")} value={studentsGrades?.length} />
              </Deferred>
              <InfoBadge
                label={t("Fecha Inicial")}
                value={formatDate(initialDate, { dateStyle: "long" })}
              />
              <InfoBadge
                label={t("Fecha Final")}
                value={formatDate(finalDate, { dateStyle: "long" })}
              />
              <InfoBadge
                label={t("Tipo de nota")}
                value={isPercent ? t("Porcentaje") : t("Suma")}
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
                  description={t("Aplicado a la columna de Nota :number exclusivamente", {
                    number: page === PagesEnum.GRADES ? 9 : 7,
                  })}
                />
                <SwitchCheckbox
                  checked={convert}
                  onChange={setConvert}
                  label={t("Convertir")}
                  description={t("Convertir números a letras")}
                />
                {canEnd && (
                  <SwitchCheckbox
                    checked={hasEnded}
                    label={t("Notificación")}
                    description={t("Marcar cuando termine el trimestre")}
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
            <AlertTitle>{t("Importante") + "!"}</AlertTitle>
            <AlertDescription>
              {t("Recuerda ir a la página de notas y guardar para obtener los promedios correctos")}
            </AlertDescription>
          </Alert>
        ) : null}
      </section>
      <section className="mt-8">
        <Deferred data="studentsGrades" fallback={<TableFormFallback />}>
          <OptionsContext.Provider value={{ page, trimester, course }}>
            {values &&
            amountOfGrades &&
            (page === PagesEnum.GRADES ||
              page === PagesEnum.SUMMER_GRADES ||
              page === PagesEnum.SHORT_TESTS ||
              page === PagesEnum.DAILY_WORKS ||
              page === PagesEnum.NOTEBOOKS_WORKS) ? (
              <DefaultTableForm
                values={values}
                amountOfGrades={amountOfGrades}
                columns={columns}
                convert={convert}
                students={studentsGrades as StudentsDefaultGrades[]}
              />
            ) : page === PagesEnum.CONDUCT_ATTENDANCE ? (
              <AttendanceTableForm students={studentsGrades as StudentsAttendanceGrades[]} />
            ) : page === PagesEnum.FINAL_EXAM ? (
              <ExamForm students={studentsGrades as StudentsExamGrades[]} />
            ) : null}
          </OptionsContext.Provider>
        </Deferred>
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
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
