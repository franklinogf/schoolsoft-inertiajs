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
  const { data, setData, errors, get, reset, processing } = useForm({
    course: "",
    trimester: "",
  });
  const { t } = useTranslation(["common", "pages", "input"]);
  const handleSubmit = () => {
    get(route("regiweb.notes.attendance.report"), { preserveState: true });
  };
  return (
    <ModalForm
      submitting={processing}
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
        {createSelectItemsFromArrayOfObjects(courses, {
          separator: " - ",
          key: "curso",
          values: ["curso", "descripcion"],
        }).map((item) => (
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
