import { PageTitle } from "@/Components/PageTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Button } from "@/Components/ui/button";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Exam } from "@/types/exam";

import { Badge } from "@/Components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import useConfirmationStore from "@/stores/confirmationStore";
import { Course } from "@/types/teacher";
import { router } from "@inertiajs/react";
import { ExamInformationButton } from "./_components/ExamInformationButton";
import { Line } from "./_components/Line";
import { Pair } from "./_components/Pair";
import { Question } from "./_components/Question";
import { Select } from "./_components/Select";
import { TrueFalse } from "./_components/TrueFalse";

export default function Page({ exam, courses }: { exam: Exam; courses: Course[] }) {
  const { t } = useTranslations();

  return (
    <RegiwebLayout title={t("Editar :label", { label: t("Examen").toLowerCase() })}>
      <PageTitle backLink={route("regiweb.options.exams.index")}>
        {t("Editar :label", { label: t("Examen").toLowerCase() })}
      </PageTitle>
      <div className="mx-auto mt-8 max-w-2xl space-y-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-center text-xl font-semibold">{exam.titulo}</h2>
          <div className="grid-cols1 grid gap-2 md:grid-cols-2">
            <ExamInformationButton exam={exam} courses={courses} />
            <GradesOptionsButton />
            <ExamReportButton />
            <CorrectExamButton />
            <PrintButton />
            <DeleteButton id={exam.id} />
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Temas del examen</h3>
            <Badge>Total: {exam.valor}</Badge>
          </div>
          <div className="bg-card px-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="truefalse">
                <AccordionTrigger>Preguntas de verdadero o falso</AccordionTrigger>
                <AccordionContent>
                  <TrueFalse examId={exam.id} topic={exam.temas.verdadero_falso} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="select">
                <AccordionTrigger>Selecciona la respuesta correcta</AccordionTrigger>
                <AccordionContent>
                  <Select examId={exam.id} topic={exam.temas.selecciona} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pair">
                <AccordionTrigger>Parea</AccordionTrigger>
                <AccordionContent>
                  <Pair examId={exam.id} topic={exam.temas.parea} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="line">
                <AccordionTrigger>Línea en blanco</AccordionTrigger>
                <AccordionContent>
                  <Line examId={exam.id} topic={exam.temas.lineas_blanco} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="question">
                <AccordionTrigger>Preguntas</AccordionTrigger>
                <AccordionContent>
                  <Question examId={exam.id} topic={exam.temas.preguntas} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </RegiwebLayout>
  );
}
function CorrectExamButton() {
  const { t } = useTranslations();
  return <Button variant="secondary">{t("Corregir examen")}</Button>;
}

function ExamReportButton() {
  const { t } = useTranslations();
  return <Button variant="secondary">{t("Informe de examen")}</Button>;
}

function GradesOptionsButton() {
  const { t } = useTranslations();
  return <Button variant="secondary">{t("Opciones de notas")}</Button>;
}

function PrintButton() {
  const { t } = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">{t("Imprimir")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{t("Carta")}</DropdownMenuItem>
        <DropdownMenuItem>{t("Hoja legal")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function DeleteButton({ id }: { id: number }) {
  const { t } = useTranslations();
  const { openConfirmation } = useConfirmationStore();
  return (
    <Button
      variant="destructive"
      onClick={() => {
        openConfirmation({
          title: t("Eliminar :label", { label: t("Examen").toLowerCase() }),
          description: t("¿Está seguro de que desea eliminar este :label?", {
            label: t("Examen").toLowerCase(),
          }),
          actionLabel: t("Eliminar"),
          cancelLabel: t("Cancelar"),
          actionVariant: "destructive",
          onAction: () => {
            router.delete(route("regiweb.options.exams.destroy", id));
          },
        });
      }}
    >
      {t("Eliminar")}
    </Button>
  );
}
