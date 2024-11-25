import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { ModalForm } from "@/Components/ModalForm";
import { SelectItem } from "@/Components/ui/select";
import { formatDateToString } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export function AttendanceDailyReportModalForm() {
  const { data, setData, reset } = useForm({
    initialDate: formatDateToString(),
    finalDate: formatDateToString(),
    option: "home",
    type: "list",
  });
  const { t } = useTranslation(["common", "pages", "input"]);
  const handleSubmit = () => {
    window.open(route("regiweb.notes.attendance.dailyReport", { ...data }));
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
        value={data.option}
        onChange={(value) => setData("option", value)}
        label={t("input:option")}
      >
        <SelectItem value="home">{t("common:homeGrade")}</SelectItem>
        <SelectItem value="student">{t("common:perStudent")}</SelectItem>
      </SelectField>
      <SelectField
        value={data.type}
        onChange={(value) => setData("type", value)}
        label={t("input:type")}
      >
        <SelectItem value="list">{t("common:list")}</SelectItem>
        <SelectItem value="summary">{t("common:summary")}</SelectItem>
      </SelectField>
    </ModalForm>
  );
}
