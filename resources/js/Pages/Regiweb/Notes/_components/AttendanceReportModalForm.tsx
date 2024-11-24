import { SelectField } from "@/Components/forms/inputs/SelectField";
import { ModalForm } from "@/Components/ModalForm";
import { SelectItem } from "@/Components/ui/select";
import {
  createSelectItemsFromArrayOfObjects,
  TRIMESTER_SELECT_WITHOUT_SUMMER,
} from "@/Constants/FormSelects";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

interface AttendanceReportModalFormProps {
  courses?: Course[];
}

export function AttendanceReportModalForm({ courses }: AttendanceReportModalFormProps) {
  const coursesSelect = createSelectItemsFromArrayOfObjects(courses, {
    separator: " - ",
    key: "curso",
    values: ["curso", "descripcion"],
  });

  const { data, setData, errors, reset } = useForm({
    course: coursesSelect[0].key,
    trimester: TRIMESTER_SELECT_WITHOUT_SUMMER[0].key,
  });
  const { t } = useTranslation(["common", "pages", "input"]);
  const handleSubmit = () => {
    window.open(route("regiweb.notes.attendance.report", { ...data }));
  };
  return (
    <ModalForm
      onClose={reset}
      onSubmit={handleSubmit}
      buttonLabel={t("pages:regiweb.notes.index.btn.attendanceReport")}
      submitLabel={t("common:btn.pdf")}
      title={t("pages:regiweb.notes.index.btn.attendanceReport")}
    >
      <SelectField
        placeholder={t("input:placeholder.select.course")}
        value={data.course}
        onChange={(value) => setData("course", value)}
        error={errors.course}
        label={t("common:course.label")}
      >
        <SelectItem value="home">{t("common:homeGrade")}</SelectItem>
        {coursesSelect.map((item) => (
          <SelectItem key={item.key} value={item.key}>
            {item.value}
          </SelectItem>
        ))}
      </SelectField>
      <SelectField
        placeholder={t("input:placeholder.select.trimester")}
        value={data.trimester}
        onChange={(value) => setData("trimester", value)}
        label={t("common:trimester.label")}
        items={TRIMESTER_SELECT_WITHOUT_SUMMER}
        error={errors.trimester}
      />
    </ModalForm>
  );
}
