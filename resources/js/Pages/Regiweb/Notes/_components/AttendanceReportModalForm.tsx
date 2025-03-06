import { SelectField } from "@/Components/forms/inputs/SelectField";
import { ModalForm } from "@/Components/ModalForm";
import { SelectItem } from "@/Components/ui/select";
import {
  createSelectItemsFromArrayOfObjects,
  TRIMESTER_SELECT_WITHOUT_SUMMER,
} from "@/Constants/FormSelects";
import { useTranslations } from "@/hooks/translations";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";

interface AttendanceReportModalFormProps {
  courses?: Course[];
}

export function AttendanceReportModalForm({ courses }: AttendanceReportModalFormProps) {
  const coursesSelect = createSelectItemsFromArrayOfObjects(courses, {
    separator: " - ",
    key: "curso",
    values: ["curso", "descripcion"],
  });

  const { data, setData, reset } = useForm({
    course: coursesSelect[0].key,
    trimester: TRIMESTER_SELECT_WITHOUT_SUMMER[0].key,
  });
  const { t } = useTranslations();
  const handleSubmit = () => {
    window.open(route("regiweb.notes.attendance.report", { ...data }));
  };
  return (
    <ModalForm
      onClose={reset}
      onSubmit={handleSubmit}
      buttonLabel={t("Informe de Asistencia")}
      submitLabel={t("PDF")}
      title={t("Informe de Asistencia")}
    >
      <SelectField
        value={data.course}
        onChange={(value) => setData("course", value)}
        label={t("Curso")}
      >
        <SelectItem value="home">{t("Salón hogar")}</SelectItem>
        {coursesSelect.map((item) => (
          <SelectItem key={item.key} value={item.key}>
            {item.value}
          </SelectItem>
        ))}
      </SelectField>
      <SelectField
        value={data.trimester}
        onChange={(value) => setData("trimester", value)}
        label={t("Trimestre")}
        items={TRIMESTER_SELECT_WITHOUT_SUMMER}
      />
    </ModalForm>
  );
}
