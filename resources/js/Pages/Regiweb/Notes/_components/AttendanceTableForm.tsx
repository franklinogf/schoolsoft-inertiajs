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
import { useTranslations } from "@/hooks/translations";
import { router, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { OptionsContext } from "../_context/OptionsContext";
import { StudentAttendaceGradeKey, StudentsAttendanceGrades } from "../_types/studentsGrades";
import { FormSubmit } from "./FormSubmit";

interface AttendanceTableFormProps {
  students: StudentsAttendanceGrades[];
}
export function AttendaceTableForm({ students }: AttendanceTableFormProps) {
  const [studentsGrades, setStudentsGrades] = useState(students);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslations();
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
          const hasChanged = (
            ["conduct", "absence", "tardy", "demerits"] as StudentAttendaceGradeKey[]
          ).some((key) => {
            return student[key].value !== initialStudent[key].value;
          });
          return {
            ...student,
            changed: hasChanged,
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
      route("regiweb.notes.attendance.save"),
      {
        data: studentsGrades as any,
        course,
        trimester,
        page,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(t("Attendance saved successfully"));
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

  function handleInputChange(id: number, key: StudentAttendaceGradeKey, value: string) {
    setStudentsGrades((prev) => {
      return prev.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            [key]: {
              ...student[key],
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
            <TableRow className="bg-primary hover:bg-primary [&>th]:text-primary-foreground [&>th]:text-center">
              <TableHead className="text-left!">#</TableHead>
              <TableHead>{t("Student")}</TableHead>
              <TableHead>{t("Conduct")}</TableHead>
              <TableHead>{t("Absences")}</TableHead>
              <TableHead>{t("Tardies")}</TableHead>
              <TableHead>{t("Demerits")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsGrades.map(
              ({ id, apellidos, nombre, changed, absence, conduct, demerits, tardy }, i) => {
                return (
                  <TableRow className={changed ? "bg-orange-200 hover:bg-orange-100" : ""} key={id}>
                    <TableHead>{i + 1}</TableHead>
                    <TableCell className="text-nowrap">{`${apellidos} ${nombre}`}</TableCell>
                    <TableCell>
                      <Input
                        className="px-1 text-center"
                        value={conduct.value}
                        onChange={(e) => {
                          handleInputChange(id, "conduct", e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="px-1 text-center"
                        value={absence.value}
                        onChange={(e) => {
                          handleInputChange(id, "absence", e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="px-1 text-center"
                        value={tardy.value}
                        onChange={(e) => {
                          handleInputChange(id, "tardy", e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="px-1 text-center"
                        value={demerits.value}
                        onChange={(e) => {
                          handleInputChange(id, "demerits", e.target.value);
                        }}
                      />
                    </TableCell>
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
