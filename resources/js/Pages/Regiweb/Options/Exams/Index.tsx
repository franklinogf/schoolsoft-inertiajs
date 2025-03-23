import { DataTable } from "@/Components/custom-ui/data-table";
import { examsListingColumns } from "@/Components/datatables/columns/exams";
import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { SwitchField } from "@/Components/forms/inputs/SwitchField";
import { TimeField } from "@/Components/forms/inputs/TimeField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { PageTitle } from "@/Components/PageTitle";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { createSelectItemsFromArrayOfObjects } from "@/Constants/FormSelects";
import { YesNoEnum } from "@/Enums";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { formatDateToString } from "@/lib/utils";
import { PageProps } from "@/types";
import { Exam } from "@/types/exam";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";

export default function Page({ exams, courses }: PageProps<{ exams: Exam[]; courses: Course[] }>) {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Generador de exámenes")}>
      <PageTitle>{t("Generador de exámenes")}</PageTitle>
      <div className="mx-auto w-full max-w-4xl">
        <DataTable
          createButton={<CreateExamFormButton courses={courses} />}
          data={exams}
          columns={examsListingColumns}
          rowId="id"
        />
      </div>
    </RegiwebLayout>
  );
}

function CreateExamFormButton({ courses }: { courses: Course[] }) {
  const { t } = useTranslations();
  const { data, setData, processing, transform, post, errors } = useForm<{
    titulo: string;
    curso: string;
    fecha: string;
    hora: string;
    hora_final: string;
    tiempo: string;
    ver_nota: boolean;
    activo: boolean;
  }>({
    titulo: "",
    curso: courses[0]?.curso ?? "",
    fecha: formatDateToString(new Date()),
    hora: "00:00",
    hora_final: "00:00",
    tiempo: "",
    ver_nota: false,
    activo: false,
  });

  transform((data) => ({
    ...data,
    ver_nota: data.ver_nota ? YesNoEnum.YES : YesNoEnum.NO,
    activo: data.activo ? YesNoEnum.YES : YesNoEnum.NO,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("regiweb.options.exams.store"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">{t("Crear :label", { label: t("Examen").toLowerCase() })}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("Crear :label", { label: t("Examen").toLowerCase() })}</DialogTitle>
          <DialogDescription>
            {t("Formulario para crear :label", { label: t("Examen").toLowerCase() })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldsGrid>
            <InputField
              label={t("Título")}
              value={data.titulo}
              onChange={(value) => setData("titulo", value)}
              error={errors.titulo}
            />
            <SelectField
              items={createSelectItemsFromArrayOfObjects(courses, {
                separator: " - ",
                key: "curso",
                values: ["curso", "descripcion"],
              })}
              label={t("Curso")}
              value={data.curso}
              onChange={(value) => setData("curso", value)}
              error={errors.curso}
            />
          </FieldsGrid>
          <FieldsGrid cols={3}>
            <DateField
              label={t("Fecha")}
              value={data.fecha}
              onChange={(value) => setData("fecha", value)}
              error={errors.fecha}
            />
            <TimeField
              label={t("Hora de inicio")}
              value={data.hora}
              onChange={(value) => setData("hora", value)}
              error={errors.hora}
            />
            <TimeField
              label={t("Hora de finalización")}
              value={data.hora_final}
              onChange={(value) => setData("hora_final", value)}
              error={errors.hora_final}
            />
          </FieldsGrid>
          <InputField
            className="max-w-xs"
            label={t("Duración")}
            type="number"
            removeArrows
            value={data.tiempo}
            onChange={(value) => setData("tiempo", value)}
            error={errors.tiempo}
          />
          <SwitchField
            label={t("Permitir ver la nota")}
            value={data.ver_nota}
            onChange={(value) => setData("ver_nota", value)}
          />
          <SwitchField
            label={t("Activo")}
            value={data.activo}
            onChange={(value) => setData("activo", value)}
          />
          <div className="flex justify-end">
            <SubmitButton disabled={processing}>
              {t("Crear :label", { label: t("Examen").toLowerCase() })}
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
