import { columns } from "@/Components/datatables/columns/admins";
import { columns as coursesColumns } from "@/Components/datatables/columns/courses";
import { columns as studentsColumns } from "@/Components/datatables/columns/students";
import { DataTable } from "@/Components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Admin } from "@/types/auth";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
interface PageProps {
  students: Student[];
  courses: Course[];
  admins: Admin[];
}
export default function Page({ students, courses, admins }: PageProps) {
  return (
    <RegiwebLayout title="Mensajes de correo electrónico">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="pb-4 text-center text-2xl font-semibold">Enviar de correo electrónico</h1>
        <Tabs defaultValue="students">
          <TabsList className="mx-auto">
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="admin">Administradores</TabsTrigger>
          </TabsList>
          <TabsContent value="students">
            <DataTable
              columns={studentsColumns}
              data={students}
              buttonLabel="Continuar"
              onButtonClick={(data) => {
                console.log(data);
              }}
            />
          </TabsContent>
          <TabsContent value="courses">
            <DataTable
              columns={coursesColumns}
              data={courses}
              buttonLabel="Continuar"
              onButtonClick={(data) => {
                console.log(data);
              }}
            />
          </TabsContent>
          <TabsContent value="admin">
            <DataTable
              columns={columns}
              data={admins}
              buttonLabel="Continuar"
              onButtonClick={(data) => {
                console.log(data);
              }}
            />
          </TabsContent>
        </Tabs>
      </section>
    </RegiwebLayout>
  );
}
