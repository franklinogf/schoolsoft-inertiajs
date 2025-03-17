import { DataTable } from "@/Components/custom-ui/data-table";
import { columns } from "@/Components/datatables/columns/admins";
import { columns as coursesColumns } from "@/Components/datatables/columns/courses";
import { columns as studentsColumns } from "@/Components/datatables/columns/students";
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
  const handleButtonClick = (data: string[]) => {
    router.get(route("regiweb.options.messages.email.form"), { data, selected: selectedTab });
  };
  const { t } = useTranslations();

  return (
    <RegiwebLayout title={t("Mensajes de correo electrónico")}>
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="pb-4 text-center text-2xl font-semibold">
          {t("Mensajes de correo electrónico")}
        </h1>
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
              columns={studentsColumns}
              data={students}
              buttonLabel={t("Continuar")}
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
          <TabsContent value={EmailSelectedEnum.COURSES}>
            <DataTable
              rowId="curso"
              columns={coursesColumns}
              data={courses}
              buttonLabel={t("Continuar")}
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
          <TabsContent value={EmailSelectedEnum.ADMIN}>
            <DataTable
              rowId="usuario"
              columns={columns}
              data={admins}
              buttonLabel={t("Continuar")}
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
        </Tabs>
      </section>
    </RegiwebLayout>
  );
}
