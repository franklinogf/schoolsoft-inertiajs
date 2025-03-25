import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField, SelectItemType } from "@/Components/forms/inputs/SelectField";
import { SelectItem } from "@/Components/ui/select";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { SelectTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function Select({ topic, examId }: { topic: Topics["selecciona"]; examId: number }) {
  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.select.updateTitle", { exam: examId }));
  }
  return (
    <Topic
      onTitleSubmit={handleSubmit}
      addButton={<FormModal examId={examId} />}
      title={topic.titulo}
      amount={topic.preguntas.length}
    >
      {topic.preguntas.map((question) => (
        <TopicItem
          key={question.id}
          label={question.pregunta}
          answer={
            question.respuestas[`respuesta${question.correcta}` as keyof typeof question.respuestas]
          }
          value={question.valor}
          editButton={<FormModal examId={examId} item={question} />}
          onDelete={() => {
            router.delete(
              route("regiweb.options.exams.select.destroy", {
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

function FormModal({ examId, item }: { examId: number; item?: SelectTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors } = useForm(
    `select${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      correcta: item?.correcta.toString() || "1",
      valor: item?.valor || "",
      respuestas: {
        respuesta1: item?.respuestas.respuesta1 || "",
        respuesta2: item?.respuestas.respuesta2 || "",
        respuesta3: item?.respuestas.respuesta3 || "",
        respuesta4: item?.respuestas.respuesta4 || "",
        respuesta5: item?.respuestas.respuesta5 || "",
        respuesta6: item?.respuestas.respuesta6 || "",
        respuesta7: item?.respuestas.respuesta7 || "",
        respuesta8: item?.respuestas.respuesta8 || "",
      },
    },
  );

  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.select.update", { exam: examId, question: item.id }));
    } else {
      post(route("regiweb.options.exams.select.store", { exam: examId }), {
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
  const amountOfanswers = 8;

  const options: SelectItemType[] = Array.from({ length: amountOfanswers }, (_, i) => ({
    label: `${t(`Respuesta`)} ${i + 1}`,
    value: i + 1,
  }));

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
        {options.map((option) => (
          <InputField
            key={option.value}
            label={option.label}
            value={data.respuestas[`respuesta${option.value}` as keyof typeof data.respuestas]}
            onChange={(value) =>
              setData(`respuestas`, { ...data.respuestas, [`respuesta${option.value}`]: value })
            }
            error={errors[`respuestas.respuesta${option.value}` as keyof typeof errors]}
          />
        ))}
      </FieldsGrid>
      <FieldsGrid>
        <SelectField
          label={t("Respuesta correcta")}
          value={data.correcta}
          onChange={(value) => {
            setData("correcta", value);
          }}
          error={errors.correcta}
          required
        >
          {options.map((option) => (
            <SelectItem
              disabled={
                data["respuestas"][`respuesta${option.value}` as keyof typeof data.respuestas] ===
                ""
              }
              key={option.value}
              value={option.value.toString()}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectField>

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
