import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { TextareaField } from "@/Components/forms/inputs/TextareaField";
import { EXAM_BLANK_LINE } from "@/Constants";
import { useTranslations } from "@/hooks/translations";
import { InertiaHTTPMethod } from "@/types";
import { BlankLinesTopic, Topics } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Topic, TopicDialog, TopicItem } from "./Topic";

export function Line({ topic, examId }: { topic: Topics["lineas_blanco"]; examId: number }) {
  const { t } = useTranslations();
  function handleSubmit(put: InertiaHTTPMethod) {
    put(route("regiweb.options.exams.blankLine.updateTitle", { exam: examId }));
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
                route("regiweb.options.exams.blankLine.destroy", {
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

function FormModal({ examId, item }: { examId: number; item?: BlankLinesTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors, hasErrors, setError } =
    useForm(`blankLine${item?.id || ""}`, {
      pregunta: item?.pregunta || "",
      respuestas: {
        respuesta1: item?.respuestas.respuesta1 || "",
        respuesta2: item?.respuestas.respuesta2 || "",
        respuesta3: item?.respuestas.respuesta3 || "",
        respuesta4: item?.respuestas.respuesta4 || "",
        respuesta5: item?.respuestas.respuesta5 || "",
      },
      valor: item?.valor || "",
    });
  function handleSubmit() {
    if (amountOfLines === 0) {
      toast.error("La pregunta debe tener al menos una respuesta");
      return;
    }
    if (item) {
      put(route("regiweb.options.exams.blankLine.update", { question: item.id }), {
        preserveScroll: true,
      });
    } else {
      post(route("regiweb.options.exams.blankLine.store", { exam: examId }), {
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
  const amountOfLines = data.pregunta.split(EXAM_BLANK_LINE).length - 1;
  const maxLines = 5;
  const isExceedingMaxLines = amountOfLines > maxLines;

  useEffect(() => {
    if (isExceedingMaxLines) {
      setError("pregunta", "La pregunta excede el número máximo de líneas permitidas.");
    } else {
      clearErrors("pregunta");
    }
  }, [isExceedingMaxLines]);

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
          Utilice 3 _ (guion abajo) y un espacio en frente por cada respuesta
        </small>
      </div>
      <div>
        {amountOfLines === 0 ? (
          <p className="font-semibold text-blue-400">Esta pregunta aun no tiene respuestas</p>
        ) : (
          <div>
            <small className="text-muted-foreground text-xs">
              Respuestas en orden de los guiones
            </small>

            <FieldsGrid>
              {Array.from({ length: amountOfLines }, (_, i) => (
                <InputField
                  key={i}
                  label={`${t("Respuesta")} ${i + 1}`}
                  type="text"
                  value={data.respuestas[`respuesta${i + 1}` as keyof typeof data.respuestas]}
                  onChange={(value) =>
                    setData("respuestas", { ...data.respuestas, [`respuesta${i + 1}`]: value })
                  }
                  error={errors[`respuestas.respuesta${i + 1}` as keyof typeof errors]}
                />
              ))}
            </FieldsGrid>
          </div>
        )}
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
