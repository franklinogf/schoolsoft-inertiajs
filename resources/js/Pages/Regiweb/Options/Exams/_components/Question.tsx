import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { QuestionTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function Question({ topic, examId }: { topic: Topics["preguntas"]; examId: number }) {
  const { t } = useTranslations();
  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.question.updateTitle", { exam: examId }));
  }
  return (
    <Topic
      onTitleSubmit={handleSubmit}
      title={topic.titulo}
      addButton={<FormModal examId={examId} />}
    >
      {topic.preguntas.length > 0 ? (
        topic.preguntas.map((question) => (
          <TopicItem
            key={question.id}
            label={question.pregunta}
            value={question.valor}
            editButton={<FormModal examId={examId} item={question} />}
            onDelete={() => {
              router.delete(
                route("regiweb.options.exams.question.destroy", {
                  question: question.id,
                }),
                { preserveScroll: true },
              );
            }}
          />
        ))
      ) : (
        <p className="text-muted-foreground text-center text-sm">
          {t("No hay :label", { label: t("Preguntas").toLowerCase() })}
        </p>
      )}
    </Topic>
  );
}

function FormModal({ examId, item }: { examId: number; item?: QuestionTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors } = useForm(
    `question${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      lineas: item?.lineas || "1",
      valor: item?.valor || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.question.update", { question: item.id }), {
        preserveScroll: true,
      });
    } else {
      post(route("regiweb.options.exams.question.store", { exam: examId }), {
        onSuccess: () => {
          reset();
        },
        preserveScroll: true,
      });
    }
  }
  function handleCancel() {
    if (hasErrors) reset();
    clearErrors();
  }
  return (
    <TopicDialog
      edit={item !== undefined}
      isSubmitting={processing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <TextareaField
        label={t("Pregunta")}
        value={data.pregunta}
        onChange={(value) => setData("pregunta", value)}
        error={errors.pregunta}
        required
      />
      <FieldsGrid>
        <InputField
          label={t("Cantidad de lineas")}
          type="number"
          value={data.lineas}
          onChange={(value) => setData("lineas", value)}
          error={errors.lineas}
          required
        />
        <InputField
          label={t("Valor")}
          type="number"
          value={data.valor}
          onChange={(value) => setData("valor", value)}
          error={errors.valor}
          required
        />
      </FieldsGrid>
    </TopicDialog>
  );
}
