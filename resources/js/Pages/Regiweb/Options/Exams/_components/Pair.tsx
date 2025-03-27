import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import { createSelectItemsFromArrayOfObjects } from "@/Constants/FormSelects";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { PairAnswer, PairTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { Topic, TopicDialog, TopicItem } from "./Topic";
export function Pair({ topic, examId }: { topic: Topics["parea"]; examId: number }) {
  const { t } = useTranslations();

  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.pair.updateTitle", { exam: examId }));
  }

  return (
    <>
      <div className="flex gap-4 px-2">
        <div className="flex items-center gap-2">
          <AnswerFormModal examId={examId} /> {t("Respuestas")}
        </div>
        <div className="flex items-center gap-2">
          <QuestionFormModal
            answers={topic.respuestas}
            disabled={topic.respuestas.length === 0}
            examId={examId}
          />
          {t("Preguntas")}
        </div>
      </div>
      <Topic onTitleSubmit={handleSubmit} title={topic.titulo}>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="font-semibold">{t("Respuestas")}</h4>
            {topic.respuestas.length > 0 ? (
              topic.respuestas.map((answer) => (
                <TopicItem
                  key={answer.id}
                  label={answer.respuesta}
                  editButton={<AnswerFormModal examId={examId} item={answer} />}
                  onDelete={() => {
                    router.delete(
                      route("regiweb.options.exams.pair.code.destroy", {
                        answer: answer.id,
                      }),
                      { preserveScroll: true },
                    );
                  }}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                {t("No hay :label", { label: t("Respuestas").toLowerCase() })}
              </p>
            )}
          </div>
          <div>
            <h4 className="font-semibold">{t("Preguntas")}</h4>
            {topic.preguntas.length > 0 ? (
              topic.preguntas.map((question) => (
                <TopicItem
                  key={question.id}
                  label={question.pregunta}
                  answer={topic.respuestas
                    .find((answer) => answer.id === question.respuesta_c)
                    ?.respuesta.toString()}
                  value={question.valor}
                  editButton={
                    <QuestionFormModal answers={topic.respuestas} examId={examId} item={question} />
                  }
                  onDelete={() => {
                    router.delete(
                      route("regiweb.options.exams.pair.destroy", {
                        question: question.id,
                      }),
                      { preserveScroll: true },
                    );
                  }}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                {t("No hay :label", { label: t("Preguntas").toLowerCase() })}
              </p>
            )}
          </div>
        </div>
      </Topic>
    </>
  );
}

function QuestionFormModal({
  examId,
  item,
  disabled,
  answers,
}: {
  examId: number;
  item?: PairTopic;
  disabled?: boolean;
  answers: PairAnswer[];
}) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors } = useForm(
    `pair_question${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      respuesta_c: item?.respuesta_c || "",
      valor: item?.valor || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.pair.update", { question: item.id }), {
        preserveScroll: true,
      });
    } else {
      post(route("regiweb.options.exams.pair.store", { exam: examId }), {
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
      disabled={disabled}
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
          label="Respuesta correcta"
          value={data.respuesta_c.toString()}
          onChange={(value) => setData("respuesta_c", value)}
          error={errors.respuesta_c}
          items={createSelectItemsFromArrayOfObjects(answers, {
            labels: ["respuesta"],
            value: "id",
          })}
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
function AnswerFormModal({ examId, item }: { examId: number; item?: PairAnswer }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors } = useForm(
    `pair_answer${item?.id || ""}`,
    {
      respuesta: item?.respuesta || "",
    },
  );
  function handleSubmit() {
    if (item) {
      put(route("regiweb.options.exams.pair.code.update", { answer: item.id }), {
        preserveScroll: true,
      });
    } else {
      post(route("regiweb.options.exams.pair.code.store", { exam: examId }), {
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
      title="Respuesta"
      edit={item !== undefined}
      isSubmitting={processing}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <InputField
        label={t("Respuesta")}
        value={data.respuesta}
        onChange={(value) => setData("respuesta", value)}
        error={errors.respuesta}
        required
      />
    </TopicDialog>
  );
}
