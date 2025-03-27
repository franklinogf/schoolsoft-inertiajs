import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { Topics, TrueFalseTopic } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function TrueFalse({ topic, examId }: { topic: Topics["verdadero_falso"]; examId: number }) {
  const { t } = useTranslations();

  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.truefalse.updateTitle", { exam: examId }));
  }
  return (
    <Topic
      onTitleSubmit={handleSubmit}
      addButton={<FormModal examId={examId} />}
      title={topic.titulo}
    >
      {topic.preguntas.length > 0 ? (
        topic.preguntas.map((question) => (
          <TopicItem
            key={question.id}
            label={question.pregunta}
            answer={question.respuesta === "v" ? t("Verdadero") : t("Falso")}
            value={question.valor}
            editButton={<FormModal examId={examId} item={question} />}
            onDelete={() => {
              router.delete(
                route("regiweb.options.exams.truefalse.destroy", {
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

function FormModal({ examId, item }: { examId: number; item?: TrueFalseTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors } = useForm(
    `truefalse${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      respuesta: item?.respuesta || "v",
      valor: item?.valor || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.truefalse.update", { question: item.id }), {
        preserveScroll: true,
      });
    } else {
      post(route("regiweb.options.exams.truefalse.store", { exam: examId }), {
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
      <InputField
        label={t("Pregunta")}
        value={data.pregunta}
        onChange={(value) => setData("pregunta", value)}
        error={errors.pregunta}
        required
      />
      <FieldsGrid>
        <SelectField
          label={t("Respuesta")}
          value={data.respuesta}
          onChange={(value) => setData("respuesta", value as TrueFalseTopic["respuesta"])}
          items={[
            { label: t("Verdadero"), value: "v" },
            { label: t("Falso"), value: "f" },
          ]}
          error={errors.respuesta}
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
