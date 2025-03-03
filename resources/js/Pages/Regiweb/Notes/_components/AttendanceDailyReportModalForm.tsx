import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { ModalForm } from "@/Components/ModalForm";
import { SelectItem } from "@/Components/ui/select";
import { useTranslations } from "@/hooks/translations";
import { formatDateToString } from "@/lib/utils";
import { Student } from "@/types/student";
import { useForm } from "@inertiajs/react";

interface AttendanceDailyReportModalFormProps {
  students: Student[];
}
export function AttendanceDailyReportModalForm({ students }: AttendanceDailyReportModalFormProps) {
  const { data, setData, reset } = useForm({
    initialDate: formatDateToString(),
    finalDate: formatDateToString(),
    option: "home",
    type: "list",
    student: students[0].mt.toString(),
  });
  const { t } = useTranslations();
  const handleSubmit = () => {
    const dataToSend: Partial<typeof data> = {
      ...data,
    };
    if (data.option === "home") {
      delete dataToSend.student;
    }
    window.open(route("regiweb.notes.attendance.dailyReport", { ...dataToSend }));
  };
  return (
    <ModalForm
      onClose={reset}
      onSubmit={handleSubmit}
      buttonLabel={t("Daily Attendance Report")}
      submitLabel={t("PDF")}
      title={t("Daily Attendance Report")}
    >
      <FieldsGrid cols={1}>
        <DateField
          label={t("Initial Date")}
          clearable={false}
          value={data.initialDate}
          onChange={(value) => setData("initialDate", value)}
        />
        <DateField
          label={t("Final Date")}
          clearable={false}
          value={data.finalDate}
          onChange={(value) => setData("finalDate", value)}
        />
      </FieldsGrid>
      <SelectField
        label={t("Option")}
        value={data.option}
        onChange={(value) => setData("option", value)}
      >
        <SelectItem value="home">{t("Home course")}</SelectItem>
        <SelectItem value="student">{t("Per student")}</SelectItem>
      </SelectField>
      {data.option === "home" && (
        <SelectField
          label={t("Type")}
          value={data.type}
          onChange={(value) => setData("type", value)}
        >
          <SelectItem value="list">{t("List")}</SelectItem>
          <SelectItem value="summary">{t("Summary")}</SelectItem>
        </SelectField>
      )}
      {data.option === "student" && (
        <SelectField
          label={t("Student")}
          value={data.student}
          onChange={(value) => setData("student", value)}
        >
          {students.map((student) => (
            <SelectItem key={student.mt} value={student.mt.toString()}>
              {`${student.apellidos} ${student.nombre}`}
            </SelectItem>
          ))}
        </SelectField>
      )}
    </ModalForm>
  );
}
