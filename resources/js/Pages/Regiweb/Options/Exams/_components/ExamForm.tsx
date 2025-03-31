import { DateField } from "@/Components/forms/inputs/DateField";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { SwitchField } from "@/Components/forms/inputs/SwitchField";
import { TimeField } from "@/Components/forms/inputs/TimeField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { createSelectItemsFromArrayOfObjects } from "@/Constants/FormSelects";
import { YesNoEnum } from "@/Enums";
import { useTranslations } from "@/hooks/translations";
import { formatDateToString } from "@/lib/utils";
import { Exam } from "@/types/exam";
import { Course } from "@/types/teacher";
import { useForm } from "@inertiajs/react";

export function ExamForm({
  courses,
  exam,
  children,
}: {
  courses: Course[];
  exam?: Exam;
  children?: React.ReactNode;
}) {
  const { t } = useTranslations();
  const { data, setData, processing, transform, post, put, errors } = useForm({
    titulo: exam?.titulo || "",
    curso: exam?.curso || courses[0]?.curso || "",
    fecha: exam?.fecha || formatDateToString(new Date()),
    hora: exam?.hora || "00:00:00",
    hora_final: exam?.hora_final || "00:00:00",
    tiempo: exam?.tiempo.toString() || "",
    ver_nota: exam?.ver_nota === YesNoEnum.YES || false,
    activo: exam?.activo === YesNoEnum.YES || false,
  });

  transform((data) => ({
    ...data,
    ver_nota: data.ver_nota ? YesNoEnum.YES : YesNoEnum.NO,
    activo: data.activo ? YesNoEnum.YES : YesNoEnum.NO,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exam) {
      put(route("regiweb.options.exams.update", { exam: exam.id }));
    } else {
      post(route("regiweb.options.exams.store"));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children || <Button></Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {exam
              ? t("Actualizar :label", { label: t("Examen").toLowerCase() })
              : t("Crear :label", { label: t("Examen").toLowerCase() })}
          </DialogTitle>
          <DialogDescription>
            {exam
              ? t("Formulario para editar :label", { label: t("Examen").toLowerCase() })
              : t("Formulario para crear :label", { label: t("Examen").toLowerCase() })}
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
                value: "curso",
                labels: ["curso", "descripcion"],
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
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{t("Cancelar")}</Button>
            </DialogClose>
            {exam && <DuplicateExamForm courses={courses} exam={exam} />}
            <SubmitButton isSubmitting={processing}>
              {exam
                ? t("Actualizar :label", { label: t("Examen").toLowerCase() })
                : t("Crear :label", { label: t("Examen").toLowerCase() })}
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DuplicateExamForm({ courses, exam }: { courses: Course[]; exam: Exam }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors } = useForm({
    titulo: exam.titulo,
    curso: exam.curso,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    post(route("regiweb.options.exams.duplicate", { exam: exam.id }));
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{t("Duplicar")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Duplicar")}</DialogTitle>
          <DialogDescription hidden></DialogDescription>
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
                value: "curso",
                labels: ["curso", "descripcion"],
              })}
              label={t("Curso")}
              value={data.curso}
              onChange={(value) => setData("curso", value)}
              error={errors.curso}
            />
          </FieldsGrid>
          <div className="flex justify-end gap-2">
            <SubmitButton isSubmitting={processing}>{t("Duplicar")}</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
