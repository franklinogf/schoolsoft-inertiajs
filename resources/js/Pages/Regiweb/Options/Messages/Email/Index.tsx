import { columns } from "@/Components/datatables/columns/admins";
import { columns as coursesColumns } from "@/Components/datatables/columns/courses";
import { columns as studentsColumns } from "@/Components/datatables/columns/students";
import { DataTable } from "@/Components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { router } from "@inertiajs/react";

export enum SelectedEnum {
  STUDENTS = "students",
  COURSES = "courses",
  ADMIN = "admin",
}

interface PageProps {
  students: Student[];
  courses: Course[];
  admins: Admin[];
  selected: SelectedEnum;
}

export default function Page({ students, courses, admins, selected }: PageProps) {
  const handleButtonClick = (data: string[]) => {
    router.get(route("regiweb.options.messages.email.form"), { data, selected });
  };

  return (
    <RegiwebLayout title="Mensajes de correo electrónico">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="pb-4 text-center text-2xl font-semibold">Mensajes de correo electrónico</h1>
        <Tabs
          defaultValue={selected}
          onValueChange={(value) => {
            router.reload({ data: { selected: value }, replace: true });
          }}
        >
          <TabsList className="mx-auto">
            <TabsTrigger value={SelectedEnum.STUDENTS}>Estudiantes</TabsTrigger>
            <TabsTrigger value={SelectedEnum.COURSES}>Cursos</TabsTrigger>
            <TabsTrigger value={SelectedEnum.ADMIN}>Administradores</TabsTrigger>
          </TabsList>
          <TabsContent value={SelectedEnum.STUDENTS}>
            <DataTable
              rowId="ss"
              columns={studentsColumns}
              data={students}
              buttonLabel="Continuar"
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
          <TabsContent value={SelectedEnum.COURSES}>
            <DataTable
              rowId="curso"
              columns={coursesColumns}
              data={courses}
              buttonLabel="Continuar"
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
          <TabsContent value={SelectedEnum.ADMIN}>
            <DataTable
              rowId="usuario"
              columns={columns}
              data={admins}
              buttonLabel="Continuar"
              onButtonClick={handleButtonClick}
            />
          </TabsContent>
        </Tabs>
      </section>
    </RegiwebLayout>
  );
}
