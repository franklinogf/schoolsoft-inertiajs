import { AlertDestructive } from "@/Components/AlertDesctructive";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { PagesEnum } from "@/Enums";
import { router, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { OptionsContext } from "../_context/OptionsContext";
import { StudentsDefaultGrades } from "../_types/studentsGrades";
import { FormSubmit } from "./FormSubmit";
import { GradesValues } from "./ValuesForm";

interface DefaultFormProps {
  columns: string[] | null;
  amountOfGrades: number;
  convert: boolean;
  values: GradesValues;
  students: StudentsDefaultGrades[];
}
export function DefaultForm({
  columns,
  amountOfGrades,
  convert,
  values,
  students,
}: DefaultFormProps) {
  const [studentsGrades, setStudentsGrades] = useState(students);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(["common", "pages"]);
  const { page, trimester, course } = useContext(OptionsContext);
  const { errors } = usePage().props;
  function calculateStudentTdp(id: number) {
    setStudentsGrades((prev) => {
      const student = prev.find((student) => student.id === id);
      if (!student) return prev;
      let tdp =
        page === PagesEnum.GRADES
          ? Number(student.tdiaTdp) + Number(student.tlibTdp) + Number(student.pcorTdp)
          : 0;
      Array.from({ length: amountOfGrades }).forEach((_, i) => {
        const number = i + 1;
        const val: string | undefined = values[`val${number}`];
        const grade = student.notas[`nota${number}`].value;
        if (grade === "") return;
        if (val === "" || val === undefined) return;
        tdp += Number(val);
      });
      return prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = {
            ...student,
            tdp: tdp === 0 ? "" : tdp.toString(),
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
      let tpa =
        page === PagesEnum.GRADES
          ? Number(student.tdia) + Number(student.tlib) + Number(student.pcor)
          : 0;
      Array.from({ length: amountOfGrades + 1 }).forEach((_, i) => {
        const number = i + 1;
        const grade = student.notas[`nota${number}`].value;
        tpa += Number(grade);
      });

      return prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = {
            ...student,
            tpa: tpa === 0 ? "" : tpa.toString(),
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
      total = isNaN(total) ? 0 : total;
      return prev.map((student) => {
        if (student.id === id) {
          const initialStudent = students.find((student) => student.id === id);
          const updatedStudent = {
            ...student,
            changed: total !== Number(initialStudent?.total),
            total: total === 0 ? "" : total.toString(),
          };
          return updatedStudent;
        }
        return student;
      });
    });
  }

  function handleGradeChange(id: number, gradeNumber: number, value: string, isBonus: boolean) {
    const gradeKey = `nota${gradeNumber}`;
    const val = values[`val${gradeNumber}`];

    if (!isBonus && (val === "" || !val)) return;
    if (!isBonus && Number(value) > Number(val)) {
      value = val;
    }

    setStudentsGrades((prev) => {
      return prev.map((student) => {
        if (student.id === id) {
          const updatedGrade = {
            ...student,
            notas: {
              ...student.notas,
              [gradeKey]: {
                ...student.notas[gradeKey],
                value,
              },
            },
          };
          return updatedGrade;
        }
        return student;
      });
    });
    calculateTotals(id);
  }
  function calculateTotals(id: number) {
    calculateStudentTpa(id);
    calculateStudentTdp(id);
    calculateStudentTotalGrade(id);
  }
  useEffect(() => {
    if (page === PagesEnum.GRADES) {
      studentsGrades.forEach(({ id }) => {
        calculateTotals(id);
      });
    }
  }, []);
  function setStudentsChangedToFalse() {
    setStudentsGrades((prev) => {
      return prev.map((prevStudent) => ({ ...prevStudent, changed: false }));
    });
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.post(
      route("regiweb.notes.default.save"),
      {
        data: studentsGrades as any,
        course,
        trimester,
        page,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(t("pages:regiweb.notes.show.successMessage.default"));
          setStudentsChangedToFalse();
        },
        onError: () => {
          toast.error(<AlertDestructive message={errors} />);
        },
        onStart: () => {
          setIsSubmitting(true);
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      },
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary [&>th]:text-center [&>th]:text-primary-foreground">
              <TableHead>#</TableHead>
              <TableHead>{t("common:student")}</TableHead>
              {Array.from({ length: amountOfGrades }, (_, i) => i + 1).map((_, i) => (
                <TableHead key={i}>
                  {t("common:note")} {i + 1}
                </TableHead>
              ))}
              {columns?.map((column, i) => <TableHead key={i}>{column}</TableHead>)}
              <TableHead>{t("common:tpa")}</TableHead>
              <TableHead>{t("common:tdp")}</TableHead>
              <TableHead>{t("common:note")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsGrades.map(
              ({ id, apellidos, nombre, notas, total, pcor, tdia, tlib, tpa, tdp, changed }, i) => {
                return (
                  <TableRow className={changed ? "bg-orange-200 hover:bg-orange-100" : ""} key={id}>
                    <TableHead>{i + 1}</TableHead>
                    <TableCell className="text-nowrap">{`${apellidos} ${nombre}`}</TableCell>
                    {Array.from({ length: amountOfGrades + 1 }).map((_, gradeIndex) => {
                      const number = gradeIndex + 1;
                      const val: string | undefined = values[`val${number}`];
                      const disabled = val === "";
                      return (
                        <TableCell className="px-1" key={gradeIndex}>
                          <Input
                            title={
                              !disabled && val !== undefined ? `Nota maxima: ${val}` : undefined
                            }
                            disabled={disabled}
                            onChange={(e) => {
                              handleGradeChange(id, number, e.target.value, number === 10);
                            }}
                            className="remove-arrows px-1 text-center"
                            type={convert ? "text" : "number"}
                            value={notas[`nota${number}`].value}
                          />
                        </TableCell>
                      );
                    })}
                    {page === PagesEnum.GRADES && (
                      <>
                        <TableHead>{tdia}</TableHead>
                        <TableHead>{tlib}</TableHead>
                        <TableHead>{pcor}</TableHead>
                      </>
                    )}
                    <TableCell>{tpa}</TableCell>
                    <TableCell>{tdp}</TableCell>
                    <TableCell>{total}</TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </div>
      <FormSubmit isSubmitting={isSubmitting} />
    </form>
  );
}
