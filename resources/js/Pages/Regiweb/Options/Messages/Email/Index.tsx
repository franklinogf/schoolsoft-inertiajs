import { DataTable } from "@/Components/custom-ui/data-table";
import { columns } from "@/Components/datatables/columns/admins";
import { coursesSelectionColumns } from "@/Components/datatables/columns/courses";
import { studentsSelectionColumns } from "@/Components/datatables/columns/students";
import { PageTitle } from "@/Components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { router } from "@inertiajs/react";
import { useState } from "react";

export enum EmailSelectedEnum {
  STUDENTS = "students",
  COURSES = "courses",
  ADMIN = "admin",
}

interface PageProps {
  students: Student[];
  courses: Course[];
  admins: Admin[];
  selected: EmailSelectedEnum;
}

export default function Page({ students, courses, admins, selected }: PageProps) {
  const [selectedTab, setSelectedTab] = useState<EmailSelectedEnum>(selected);

  const { t } = useTranslations();

  return (
    <RegiwebLayout title={t("Mensajes de correo electrónico")}>
      <section className="mx-auto w-full max-w-4xl">
        <PageTitle>{t("Mensajes de correo electrónico")}</PageTitle>
        <Tabs
          value={selectedTab}
          onValueChange={(value) => {
            setSelectedTab(value as EmailSelectedEnum);
            router.reload({ data: { selected: value }, replace: true });
          }}
        >
          <TabsList className="mx-auto">
            <TabsTrigger value={EmailSelectedEnum.STUDENTS}>{t("Estudiantes")}</TabsTrigger>
            <TabsTrigger value={EmailSelectedEnum.COURSES}>{t("Cursos")}</TabsTrigger>
            <TabsTrigger value={EmailSelectedEnum.ADMIN}>{t("Administradores")}</TabsTrigger>
          </TabsList>
          <TabsContent value={EmailSelectedEnum.STUDENTS}>
            <DataTable
              rowId="ss"
              columns={studentsSelectionColumns}
              data={students}
              buttonLabel={t("Continuar")}
              onButtonClick={(data) => {
                const selectedStudents = data.map((student) => student.ss);
                router.get(route("regiweb.options.messages.email.form"), {
                  data: selectedStudents,
                  selected: selectedTab,
                });
              }}
            />
          </TabsContent>
          <TabsContent value={EmailSelectedEnum.COURSES}>
            <DataTable
              rowId="curso"
              columns={coursesSelectionColumns}
              data={courses}
              buttonLabel={t("Continuar")}
              onButtonClick={(data) => {
                const selectedCourses = data.map((course) => course.curso);
                router.get(route("regiweb.options.messages.email.form"), {
                  data: selectedCourses,
                  selected: selectedTab,
                });
              }}
            />
          </TabsContent>
          <TabsContent value={EmailSelectedEnum.ADMIN}>
            <DataTable
              rowId="usuario"
              columns={columns}
              data={admins}
              buttonLabel={t("Continuar")}
              onButtonClick={(data) => {
                const selectedAdmins = data.map((admin) => admin.usuario);
                router.get(route("regiweb.options.messages.email.form"), {
                  data: selectedAdmins,
                  selected: selectedTab,
                });
              }}
            />
          </TabsContent>
        </Tabs>
      </section>
    </RegiwebLayout>
  );
}
