import { InfoBadge } from "@/Components/InfoBadge";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { PagesEnum, TrimesterEnum } from "@/Enums";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDate } from "@/lib/utils";
import type { PagePropsWithUser } from "@/types";
import { StudentGrade } from "@/types/Student";
import type { Teacher } from "@/types/Teacher";
import { Head } from "@inertiajs/react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import ValuesForm, { GradesValues } from "./_components/ValuesForm";

interface PageProps extends PagePropsWithUser<Teacher> {
  course: string;
  page: PagesEnum;
  trimester: TrimesterEnum;
  students: StudentGrade[];
  initialDate: string;
  finalDate: string;
  isLetter: boolean;
  isPercent: boolean;
  canEnd: boolean;
  hasEnded: boolean;
  amountOfGrades: number;
  columns: string[] | null;
  gradesNumbers: [number, number];
  gradesValues: GradesValues[];
  gradesValuesId: number;
}
export default function Show({
  auth,
  course,
  page,
  trimester,
  students: initialStudents,
  initialDate,
  finalDate,
  isLetter,
  isPercent,
  canEnd,
  hasEnded,
  amountOfGrades,
  columns,
  gradesNumbers,
  gradesValues,
  gradesValuesId,
}: PageProps) {
  const [convert, setConvert] = useState(false);
  const [studentGrades, setStudentsGrades] = useState(initialStudents);
  const [values, setValues] = useState<GradesValues[]>(gradesValues);
  const { t } = useTranslation();
  function handleGradeChange(id: number, grade: string, value: string) {
    console.log(Number(value) < 0);
    const updatedStudents = studentGrades.map((student) => {
      if (student.aa === id) {
        return {
          ...student,
          [grade]: Number(value) < 0 ? 0 : value,
        };
      }
      return student;
    });
    setStudentsGrades(updatedStudents);
  }

  function handleValueChange(valueKey: string, value: string) {
    //@ts-ignore
    const updatedValues = Object.entries(values).reduce((acc, [key, val]) => {
      if (key === valueKey) {
        return { ...acc, [key]: value };
      }
      return { ...acc, [key]: val };
    }, {}) as GradesValues[];

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
                <InfoBadge label={t("Trimestre")} value={trimester} />
                <InfoBadge label={t("Entrando notas a")} value={page} />
                <InfoBadge label={t("Total de estudiantes")} value={initialStudents.length} />
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
          {(page === PagesEnum.Notas || page === PagesEnum["V-Nota"]) && (
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
                      page === PagesEnum.Notas
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
        </section>
        <section className="mt-8">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary [&>th]:text-center [&>th]:text-primary-foreground">
                  <TableHead>#</TableHead>
                  <TableHead>Estudiante</TableHead>
                  {Array.from({ length: amountOfGrades }, (_, i) => i + 1).map((_, i) => (
                    <TableHead key={i}>
                      {t("Nota")} {i + 1}
                    </TableHead>
                  ))}
                  {columns?.map((column, i) => <TableHead key={i}>{t(column)}</TableHead>)}
                  <TableHead>{t("TPA")}</TableHead>
                  <TableHead>{t("TDP")}</TableHead>
                  <TableHead>{t("Nota")}</TableHead>
                  {page === PagesEnum["V-Nota"] && (
                    <>
                      <TableHead>{t("Conducta")}</TableHead>
                      <TableHead>{t("Ausencias")}</TableHead>
                      <TableHead>{t("Tardanzas")}</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentGrades.map((student, i) => {
                  let total = 0;
                  let amount = 0;
                  const grades = {};
                  for (let i = gradesNumbers[0]; i <= gradesNumbers[1]; i++) {
                    const grade = student[`not${i}` as keyof StudentGrade];
                    if (grade !== "") {
                      amount++;
                      total += Number(student[`not${i}` as keyof StudentGrade]);
                    }
                    Object.assign(grades, { [`not${i}`]: grade });
                  }
                  const gradeTotal = amount === 0 ? 0 : total / amount;

                  return (
                    <TableRow key={i}>
                      <TableHead>{i + 1}</TableHead>
                      <TableCell className="text-nowrap">{`${student.apellidos} ${student.nombre}`}</TableCell>
                      {Object.entries(grades).map(([key, value], i) => (
                        <TableCell className="text-nowrap px-1" key={i}>
                          <Input
                            onChange={(e) => handleGradeChange(student.aa, key, e.target.value)}
                            className="remove-arrows px-1 text-center"
                            type={convert ? "text" : "number"}
                            value={value as string}
                          />
                        </TableCell>
                      ))}
                      {columns?.map((column, i) => <TableCell key={i}></TableCell>)}
                      {/* <TableCell>{student.tpa}</TableCell>
                      <TableCell>{student.tdp}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      {page === PagesEnum["V-Nota"] && (
                        <>
                          <TableCell>{student.conduct}</TableCell>
                          <TableCell>{student.absences}</TableCell>
                          <TableCell>{student.tardiness}</TableCell>
                        </>
                      )} */}
                      <TableCell></TableCell>
                      <TableCell>{gradeTotal === 0 ? "" : gradeTotal}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>
        <section className="mt-8">
          <ValuesForm
            values={values}
            id={gradesValuesId}
            amoutOfGrades={amountOfGrades}
            onValueChange={handleValueChange}
          />
        </section>
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
