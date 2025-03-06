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
      buttonLabel={t("Informe de Asistencia Diaria")}
      submitLabel={t("PDF")}
      title={t("Informe de Asistencia Diaria")}
    >
      <FieldsGrid cols={1}>
        <DateField
          label={t("Fecha Inicial")}
          clearable={false}
          value={data.initialDate}
          onChange={(value) => setData("initialDate", value)}
        />
        <DateField
          label={t("Fecha Final")}
          clearable={false}
          value={data.finalDate}
          onChange={(value) => setData("finalDate", value)}
        />
      </FieldsGrid>
      <SelectField
        label={t("Opción")}
        value={data.option}
        onChange={(value) => setData("option", value)}
      >
        <SelectItem value="home">{t("Salón hogar")}</SelectItem>
        <SelectItem value="student">{t("Por estudiante")}</SelectItem>
      </SelectField>
      {data.option === "home" && (
        <SelectField
          label={t("Tipo")}
          value={data.type}
          onChange={(value) => setData("type", value)}
        >
          <SelectItem value="list">{t("Lista")}</SelectItem>
          <SelectItem value="summary">{t("Resumen")}</SelectItem>
        </SelectField>
      )}
      {data.option === "student" && (
        <SelectField
          label={t("Estudiante")}
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
