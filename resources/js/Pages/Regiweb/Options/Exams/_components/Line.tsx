import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { BlankLinesTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function Line({ topic, examId }: { topic: Topics["lineas_blanco"]; examId: number }) {
  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.blankLine.updateTitle", { exam: examId }));
  }
  return (
    <Topic
      onTitleSubmit={handleSubmit}
      amount={topic.preguntas.length}
      title={topic.titulo}
      addButton={<FormModal examId={examId} />}
    >
      {topic.preguntas.map((question) => (
        <TopicItem
          key={question.id}
          label={question.pregunta}
          value={question.valor}
          editButton={<FormModal examId={examId} item={question} />}
          onDelete={() => {
            router.delete(
              route("regiweb.options.exams.blankLine.destroy", {
                exam: examId,
                question: question.id,
              }),
            );
          }}
        />
      ))}
    </Topic>
  );
}

function FormModal({ examId, item }: { examId: number; item?: BlankLinesTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors } = useForm(
    `blankLine${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      respuestas: {
        repuesta1: item?.respuestas.respuesta1 || "",
        repuesta2: item?.respuestas.respuesta2 || "",
        repuesta3: item?.respuestas.respuesta3 || "",
        repuesta4: item?.respuestas.respuesta4 || "",
        repuesta5: item?.respuestas.respuesta5 || "",
      },
      valor: item?.valor || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.blankLine.update", { exam: examId, question: item.id }));
    } else {
      post(route("regiweb.options.exams.blankLine.store", { exam: examId }), {
        onSuccess: () => {
          reset();
        },
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
      <div>
        <TextareaField
          label={t("Pregunta")}
          value={data.pregunta}
          onChange={(value) => setData("pregunta", value)}
          error={errors.pregunta}
          required
        />
        <small className="text-muted-foreground text-xs">
          Utilice 3 _ (guion abajo) por cada respuesta
        </small>
      </div>
      <div>
        <small className="text-muted-foreground text-xs">Respuestas en orden de los guiones</small>
        <FieldsGrid>
          {Array.from({ length: 5 }, (_, i) => (
            <InputField
              key={i}
              label={`${t("Respuesta")} ${i + 1}`}
              type="text"
              value={data.respuestas[`respuesta${i + 1}` as keyof typeof data.respuestas]}
              onChange={(value) =>
                setData("respuestas", { ...data.respuestas, [`respuesta${i + 1}`]: value })
              }
              error={errors[`respuestas.respuesta${i + 1}` as keyof typeof errors]}
              required
            />
          ))}
        </FieldsGrid>
      </div>
      <FieldsGrid>
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
