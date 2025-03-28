import { Button } from "@/Components/ui/button";
import { useTranslations } from "@/hooks/translations";
import { Exam } from "@/types/exam";
import { Course } from "@/types/teacher";
import { ExamForm } from "./ExamForm";

export function ExamInformationButton({ exam, courses }: { exam: Exam; courses: Course[] }) {
  const { t } = useTranslations();
  return (
    <ExamForm exam={exam} courses={courses}>
      <Button variant="secondary">{t("Información del examen")}</Button>
    </ExamForm>
  );
}
