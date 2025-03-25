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
import { Line } from "./_components/Line";
import { Pair } from "./_components/Pair";
import { Question } from "./_components/Question";
import { Select } from "./_components/Select";
import { TrueFalse } from "./_components/TrueFalse";

export default function Page({ exam }: { exam: Exam }) {
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
            <Button variant="secondary">informacíon del examen</Button>
            <Button variant="secondary">Opciones de notas</Button>
            <Button variant="secondary">Informe de examen</Button>
            <Button variant="secondary">Corregir examen</Button>
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
