import { DataTable } from "@/Components/custom-ui/data-table";
import { examsListingColumns } from "@/Components/datatables/columns/exams";
import { PageTitle } from "@/Components/PageTitle";
import { Button } from "@/Components/ui/button";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PageProps } from "@/types";
import { Exam } from "@/types/exam";
import { Course } from "@/types/teacher";
import { ExamForm } from "./_components/ExamForm";

export default function Page({ exams, courses }: PageProps<{ exams: Exam[]; courses: Course[] }>) {
  const { t } = useTranslations();
  return (
    <RegiwebLayout title={t("Generador de exámenes")}>
      <PageTitle>{t("Generador de exámenes")}</PageTitle>
      <div className="mx-auto w-full max-w-4xl">
        <DataTable
          createButton={<CreateExamFormButton courses={courses} />}
          data={exams}
          columns={examsListingColumns}
          rowId="id"
        />
      </div>
    </RegiwebLayout>
  );
}

function CreateExamFormButton({ courses }: { courses: Course[] }) {
  const { t } = useTranslations();

  return (
    <ExamForm courses={courses}>
      <Button size="sm">{t("Crear :label", { label: t("Examen").toLowerCase() })}</Button>
    </ExamForm>
  );
}
