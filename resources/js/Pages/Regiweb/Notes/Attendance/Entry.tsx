import { DateField } from "@/Components/forms/inputs/DateField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { Button } from "@/Components/ui/button";
import { SelectGroup, SelectItem, SelectLabel } from "@/Components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { ABSENCES_ATTENDANCE, TARDINESS_ATTENDANCE } from "@/Constants";
import { createSelectItems } from "@/Constants/FormSelects";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
type StudentAttendance = {
  id: number | null;
  name: string;
  attendance: string;
  studentId: number;
};
interface PageProps {
  attendanceOption: "1" | "2" | "3";
  initialDate: string;
  initialGrade: string;
  initialSubject: string;
  studentsAttendances: StudentAttendance[];
  grades: null | string[];
  subjects: null | string[];
}
export default function Page({
  attendanceOption,
  initialDate,
  studentsAttendances,
  grades,
  initialGrade,
  initialSubject,
  subjects,
}: PageProps) {
  const [date, setDate] = useState<string>(initialDate);
  const handleChangeDate = (value: string) => {
    setDate(value);
    router.get(route("regiweb.notes.attendance.entry", { date: value }));
  };

  const handleChangeAttendance = (id: number | null, studentId: number, value: string) => {
    router.put(
      route("regiweb.notes.attendance.entry.update"),
      {
        id,
        studentId,
        date,
        attendance: value,
        subject: initialSubject,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Asistencia actualizada");
        },
        onError: (error) => {
          toast.error("Error al actualizar la asistencia", error);
        },
      },
    );
  };
  return (
    <RegiwebLayout title="Attendance Entry">
      <section className="mx-auto max-w-xl">
        <h1 className="page-primary-title">Entrada de asistencias</h1>
        <div className="my-8">
          <DateField clearable={false} value={date} onChange={handleChangeDate} />
        </div>
        <div className="flex flex-wrap gap-2">
          {attendanceOption === "2" &&
            grades?.map((grade) => (
              <Button className="grow" key={grade} variant={"outline"} asChild>
                <Link
                  disabled={initialGrade === grade}
                  as={initialGrade === grade ? "button" : "a"}
                  href={route("regiweb.notes.attendance.entry", { date, grade })}
                >
                  {grade}
                </Link>
              </Button>
            ))}
          {attendanceOption === "3" &&
            subjects?.map((subject) => (
              <Button className="grow" key={subject} variant={"outline"} asChild>
                <Link
                  disabled={initialSubject === subject}
                  as={initialSubject === subject ? "button" : "a"}
                  href={route("regiweb.notes.attendance.entry", { date, subject })}
                >
                  {subject}
                </Link>
              </Button>
            ))}
        </div>
      </section>
      <section className="mt-8">
        <Table className="mx-auto max-w-2xl">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Estudiante</TableHead>
              <TableHead>Asistencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsAttendances.map((student, index) => (
              <TableRow key={student.studentId}>
                <TableHead>{index + 1}</TableHead>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <SelectField
                    clearable
                    value={student.attendance}
                    onChange={(value) => {
                      handleChangeAttendance(student.id, student.studentId, value);
                    }}
                    placeholder="Select"
                  >
                    <SelectGroup>
                      <SelectLabel>Ausencias</SelectLabel>
                      {createSelectItems(ABSENCES_ATTENDANCE).map((absence) => (
                        <SelectItem key={absence.key} value={absence.key}>
                          {absence.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Tardanzas</SelectLabel>
                      {createSelectItems(TARDINESS_ATTENDANCE).map((absence) => (
                        <SelectItem key={absence.key} value={absence.key}>
                          {absence.value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </RegiwebLayout>
  );
}
