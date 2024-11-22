import { DateField } from "@/Components/forms/inputs/DateField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
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
import { router } from "@inertiajs/react";
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
  studentsAttendances: StudentAttendance[];
}
export default function Page({ attendanceOption, initialDate, studentsAttendances }: PageProps) {
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
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Asistencia actualizada");
        },
      },
    );
  };
  return (
    <RegiwebLayout title="Attendance Entry">
      <section className="mx-auto max-w-xl">
        <h1 className="page-primary-title">Entrada de asistencias</h1>
        <div className="mt-8">
          <DateField clearable={false} value={date} onChange={handleChangeDate} />
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
