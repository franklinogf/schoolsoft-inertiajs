import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { QuestionTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function Question({ topic, examId }: { topic: Topics["preguntas"]; examId: number }) {
  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.question.updateTitle", { exam: examId }));
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
              route("regiweb.options.exams.question.destroy", {
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

function FormModal({ examId, item }: { examId: number; item?: QuestionTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors } = useForm(
    `question${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      //   respuesta: item?.respuesta || "v",
      valor: item?.valor || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.question.update", { exam: examId, question: item.id }));
    } else {
      post(route("regiweb.options.exams.question.store", { exam: examId }), {
        onSuccess: () => {
          reset();
        },
      });
    }
  }
  function handleCancel() {
    reset();
    clearErrors();
  }
  return (
    <TopicDialog
      edit={item !== undefined}
      isSubmitting={processing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <InputField
        label={t("Pregunta")}
        value={data.pregunta}
        onChange={(value) => setData("pregunta", value)}
        error={errors.pregunta}
        required
      />
      <FieldsGrid>
        {/* <SelectField
          label={t("Respuesta")}
          value={data.respuesta}
          onChange={(value) => setData("respuesta", value as TrueFalseTopic["respuesta"])}
          items={[
            { label: t("Verdadero"), value: "v" },
            { label: t("Falso"), value: "f" },
          ]}
          error={errors.respuesta}
          required
        /> */}
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
