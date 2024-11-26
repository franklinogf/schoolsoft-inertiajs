import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { ModalForm } from "@/Components/ModalForm";
import { SelectItem } from "@/Components/ui/select";
import { formatDateToString } from "@/lib/utils";
import { Student } from "@/types/student";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["common", "pages", "input"]);
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
      buttonLabel={t("pages:regiweb.notes.index.btn.dailyAttendanceReport")}
      submitLabel={t("common:btn.pdf")}
      title={t("pages:regiweb.notes.index.btn.dailyAttendanceReport")}
    >
      <FieldsGrid cols={1}>
        <DateField
          label={t("input:initialDate")}
          clearable={false}
          value={data.initialDate}
          onChange={(value) => setData("initialDate", value)}
        />
        <DateField
          label={t("input:finalDate")}
          clearable={false}
          value={data.finalDate}
          onChange={(value) => setData("finalDate", value)}
        />
      </FieldsGrid>
      <SelectField
        label={t("input:option")}
        value={data.option}
        onChange={(value) => setData("option", value)}
      >
        <SelectItem value="home">{t("common:homeGrade")}</SelectItem>
        <SelectItem value="student">{t("common:perStudent")}</SelectItem>
      </SelectField>
      {data.option === "home" && (
        <SelectField
          label={t("input:type")}
          value={data.type}
          onChange={(value) => setData("type", value)}
        >
          <SelectItem value="list">{t("common:list")}</SelectItem>
          <SelectItem value="summary">{t("common:summary")}</SelectItem>
        </SelectField>
      )}
      {data.option === "student" && (
        <SelectField
          label={t("input:student")}
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
