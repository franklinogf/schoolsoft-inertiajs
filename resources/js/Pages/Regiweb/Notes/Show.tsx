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
import type { Teacher } from "@/types/Teacher";
import { Head } from "@inertiajs/react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import ValuesForm, { GradesValues } from "./_components/ValuesForm";
type Grade = {
  value: string;
};
type StudentsGrades = {
  id: number;
  nombre: string;
  apellidos: string;
  notas: {
    [key: string]: Grade;
    nota1: Grade;
    nota2: Grade;
    nota3: Grade;
    nota4: Grade;
    nota5: Grade;
    nota6: Grade;
    nota7: Grade;
    nota8: Grade;
    nota9: Grade;
    nota10: Grade;
  };
  total: string;
  tdia: string;
  tlib: string;
  pcor: string;
  tpa: string;
  tdp: string;
  tdiaTdp: string;
  tlibTdp: string;
  pcorTdp: string;
};
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
  amountOfGrades: number;
  columns: string[] | null;
  gradesValues: GradesValues;
  gradesValuesId: number;
}
export default function Show({
  auth,
  course,
  page,
  trimester,
  studentsGrades: initialStudents,
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
  const [studentGrades, setStudentsGrades] = useState(initialStudents);
  const [values, setValues] = useState<GradesValues>(gradesValues);
  const { t } = useTranslation();

  function calculateStudentTdp(id: number) {
    setStudentsGrades((prev) => {
      const student = prev.find((student) => student.id === id);
      if (!student) return prev;
      let tdp = Number(student.tdiaTdp) + Number(student.tlibTdp) + Number(student.pcorTdp);
      Array.from({ length: amountOfGrades }).forEach((_, i) => {
        const number = i + 1;
        const val = values[`val${number}`];
        const grade = student.notas[`nota${number}`].value;

        if (grade === "") return;
        if (val === "") return;
        tdp += Number(val);
      });
      return prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = {
            ...student,
            tdp: String(tdp),
          };
          return updatedStudent;
        }
        return student;
      });
    });
  }
  function calculateStudentTpa(id: number) {
    setStudentsGrades((prev) => {
      const student = prev.find((student) => student.id === id);
      if (!student) return prev;
      let tpa = Number(student.tdia) + Number(student.tlib) + Number(student.pcor);
      Array.from({ length: amountOfGrades }).forEach((_, i) => {
        const number = i + 1;
        const grade = student.notas[`nota${number}`].value;
        tpa += Number(grade);
      });

      return prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = {
            ...student,
            tpa: String(tpa),
          };
          return updatedStudent;
        }
        return student;
      });
    });
  }
  function calculateStudentTotalGrade(id: number) {
    setStudentsGrades((prev) => {
      const student = prev.find((student) => student.id === id);
      if (!student) return prev;
      let total = Math.round((Number(student.tpa) / Number(student.tdp)) * 100);
      return prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = {
            ...student,
            total: String(total),
          };
          return updatedStudent;
        }
        return student;
      });
    });
  }
  function handleGradeChange(id: number, gradeKey: string, value: string) {
    const gradeNumber = gradeKey.slice(-1);
    const val = values[`val${gradeNumber}`];
    if (val === "" || !val) return;
    if (Number(value) > Number(val)) {
      value = val;
    }
    setStudentsGrades((prev) => {
      return prev.map((student) => {
        if (student.id === id) {
          const updatedGrade = {
            ...student,
            notas: {
              ...student.notas,
              [gradeKey]: { value },
            },
          };
          return updatedGrade;
        }
        return student;
      });
    });
    calculateStudentTpa(id);
    calculateStudentTdp(id);
    calculateStudentTotalGrade(id);
  }

  function handleValueChange(valueKey: string, value: string) {
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
                {studentGrades.map(
                  ({ id, apellidos, nombre, notas, total, pcor, tdia, tlib, tpa, tdp }, i) => {
                    return (
                      <TableRow key={id}>
                        <TableHead>{i + 1}</TableHead>
                        <TableCell className="text-nowrap">{`${apellidos} ${nombre}`}</TableCell>
                        {Array.from({ length: amountOfGrades + 1 }).map((_, i) => {
                          const number = i + 1;
                          return (
                            <TableCell className="text-nowrap px-1" key={i}>
                              <Input
                                disabled={values[`val${number}`] === ""}
                                onChange={(e) => {
                                  handleGradeChange(id, `nota${number}`, e.target.value);
                                }}
                                className="remove-arrows px-1 text-center"
                                type={convert ? "text" : "number"}
                                value={notas[`nota${number}`].value}
                              />
                            </TableCell>
                          );
                        })}
                        <TableHead>{tdia}</TableHead>
                        <TableHead>{tlib}</TableHead>
                        <TableHead>{pcor}</TableHead>
                        <TableCell>{tpa}</TableCell>
                        <TableCell>{tdp}</TableCell>
                        {/* {page === PagesEnum["V-Nota"] && (
                          <>
                            <TableCell>{student.conduct}</TableCell>
                            <TableCell>{student.absences}</TableCell>
                            <TableCell>{student.tardiness}</TableCell>
                          </>
                        )} */}
                        <TableCell>{total}</TableCell>
                      </TableRow>
                    );
                  },
                )}
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
