import { PageTitle } from "@/Components/PageTitle";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Exam } from "@/types/exam";

export default function Page({ exam }: { exam: Exam }) {
  return (
    <RegiwebLayout title="Editar examen">
      <PageTitle backLink={route("regiweb.options.exams.index")}>Editar examen</PageTitle>
    </RegiwebLayout>
  );
}
