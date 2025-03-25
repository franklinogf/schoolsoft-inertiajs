import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { badgeVariants } from "@/Components/ui/badge";
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
import { useTranslations } from "@/hooks/translations";
import { Topics, TrueFalseTopic } from "@/types/exam";
import { router, useForm } from "@inertiajs/react";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import { Topic, TopicItem } from "./Topic";

export function TrueFalse({ topic, examId }: { topic: Topics["verdadero_falso"]; examId: number }) {
  return (
    <Topic
      amount={topic.preguntas.length}
      addButton={<FormModal examId={examId} />}
      title={topic.titulo}
    >
      {topic.preguntas.map((question) => (
        <TopicItem
          key={question.id}
          label={question.pregunta}
          answer={question.respuesta === "v" ? "Verdadero" : "Falso"}
          value={question.valor}
          editButton={<FormModal examId={examId} item={question} />}
          onDelete={() => {
            router.delete(
              route("regiweb.options.exams.truefalse.destroy", {
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

function FormModal({ examId, item }: { examId: number; item?: TrueFalseTopic }) {
  const { t } = useTranslations();
  const { data, setData, processing, post, errors, reset, put, clearErrors } = useForm(
    `truefalse${item?.id || ""}`,
    {
      pregunta: item?.pregunta || "",
      respuesta: item?.respuesta || "v",
      valor: item?.valor || "",
    },
  );
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (item) {
      put(route("regiweb.options.exams.truefalse.update", { exam: examId, question: item.id }));
    } else {
      post(route("regiweb.options.exams.truefalse.store", { exam: examId }), {
        onSuccess: () => {
          reset();
        },
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {item ? (
          <button className={badgeVariants({ variant: "secondary", className: "h-5" })}>
            <EditIcon />
          </button>
        ) : (
          <Button className="size-6" size="icon">
            <PlusCircleIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item
              ? t("Editar :label", { label: t("Pregunta").toLowerCase() })
              : t("Nueva :label", { label: t("Pregunta").toLowerCase() })}
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleSubmit}>
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
          <div className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  reset();
                  clearErrors();
                }}
                variant="outline"
              >
                {t("Cancelar")}
              </Button>
            </DialogClose>
            <SubmitButton disabled={processing}>{item ? t("Editar") : t("Agregar")}</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
