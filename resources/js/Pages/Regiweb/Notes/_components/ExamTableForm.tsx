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
import { router, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { OptionsContext } from "../_context/OptionsContext";
import { StudentsExamGrades } from "../_types/studentsGrades";
import { FormSubmit } from "./FormSubmit";

interface ExamTableFormProps {
  students: StudentsExamGrades[];
}
export function ExamForm({ students }: ExamTableFormProps) {
  const [studentsGrades, setStudentsGrades] = useState(students);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(["common", "pages"]);
  const { page, trimester, course } = useContext(OptionsContext);
  const { errors } = usePage().props;

  function setStudentsChangedToFalse() {
    setStudentsGrades((prev) => {
      return prev.map((prevStudent) => ({ ...prevStudent, changed: false }));
    });
  }
  function checkIfStudentChanged(id: number) {
    setStudentsGrades((prev) => {
      return prev.map((student) => {
        if (student.id === id) {
          const initialStudent = students.find((s) => s.id === id);
          if (!initialStudent) return student;
          return {
            ...student,
            changed: initialStudent.nota.value !== student.nota.value,
          };
        }
        return student;
      });
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(studentsGrades);
    router.post(
      route("regiweb.notes.exam.save"),
      {
        data: studentsGrades as any,
        course,
        trimester,
        page,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(t("pages:regiweb.notes.show.successMessage.exam"));
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

  function handleInputChange(id: number, value: string) {
    setStudentsGrades((prev) => {
      return prev.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            nota: {
              ...student.nota,
              value,
            },
          };
        }
        return student;
      });
    });
    checkIfStudentChanged(id);
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary [&>th]:text-center [&>th]:text-primary-foreground">
              <TableHead className="text-left!">#</TableHead>
              <TableHead>{t("common:student")}</TableHead>
              <TableHead>{t("common:note")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsGrades.map(({ id, apellidos, nombre, changed, nota }, i) => {
              return (
                <TableRow className={changed ? "bg-orange-200 hover:bg-orange-100" : ""} key={id}>
                  <TableHead>{i + 1}</TableHead>
                  <TableCell className="text-nowrap">{`${apellidos} ${nombre}`}</TableCell>
                  <TableCell className="flex justify-center">
                    <Input
                      className="max-w-32 px-1 text-center"
                      value={nota.value}
                      onChange={(e) => {
                        handleInputChange(id, e.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <FormSubmit isSubmitting={isSubmitting} />
    </form>
  );
}
