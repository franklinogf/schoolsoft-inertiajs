import { DataTable } from "@/Components/custom-ui/data-table";
import { coursesListingColumns } from "@/Components/datatables/columns/courses";
import { studentsSelectionColumns } from "@/Components/datatables/columns/students";
import { InputField } from "@/Components/forms/inputs/InputField";
import { RichTextField } from "@/Components/forms/inputs/RichTextField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PageProps } from "@/types";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const coursesCreateMessage: ColumnDef<Course>[] = [
  ...coursesListingColumns,
  {
    id: "actions",
    enableHiding: false,
    size: 20,
    cell: ({ row }) => {
      const { t } = useTranslations();
      const course = row.original.curso;
      return (
        <div className="flex justify-center">
          <Button className="cursor-pointer" variant="outline">
            <Link href={route("regiweb.options.messages.create", { course })}>
              {t("Seleccionar")}
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export default function Page({
  course,
  students,
  courses,
}: PageProps<{
  courses: Course[];
  students: Student[];
  course: string | null;
}>) {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const { t, tChoice } = useTranslations();

  const { data, setData, errors, processing, post } = useForm({
    subject: "",
    message: "",
  });

  const to =
    selectedStudents.length === 1
      ? `${selectedStudents[0]?.nombre} ${selectedStudents[0]?.apellidos}`
      : `${selectedStudents[0]?.nombre} ${selectedStudents[0]?.apellidos} ` +
        tChoice("y :amount estudiante más|y :amount estudiantes más", selectedStudents.length - 1, {
          amount: selectedStudents.length - 1,
        });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(
      route("regiweb.options.messages.store", {
        course,
        students: selectedStudents.map((student) => student.ss ?? ""),
      }),
    );
  }

  return (
    <RegiwebLayout title={t("Nuevo mensaje")}>
      <div className="w-full pb-8">
        <h1 className="text-foreground text-center text-3xl font-bold">{t("Nuevo mensaje")}</h1>
        <div className="mx-auto mt-8 w-full max-w-4xl">
          <Button className="mb-4" variant="outline">
            <Link href={route("regiweb.options.messages.index")}>{t("Volver")}</Link>
          </Button>
          {course === null ? (
            <DataTable rowId="curso" columns={coursesCreateMessage} data={courses} />
          ) : (
            <>
              <DataTable
                data={students}
                columns={studentsSelectionColumns}
                rowId="ss"
                buttonLabel={t("Continuar")}
                onButtonClick={(data) => {
                  setSelectedStudents(data);
                  setOpen(true);
                }}
              />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-dvh overflow-y-auto sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{t("Enviar mensaje")}</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit}>
                    <Card>
                      <CardContent className="space-y-2">
                        <InputField label={t("Para")} name="to" disabled defaultValue={to} />
                        <InputField
                          required
                          value={data.subject}
                          onChange={(value) => {
                            setData("subject", value);
                          }}
                          error={errors.subject}
                          label={t("Asunto")}
                          name="subject"
                        />
                        <RichTextField
                          label={t("Mensaje")}
                          value={data.message}
                          onChange={(value) => {
                            setData("message", value);
                          }}
                          error={errors.message}
                        />
                      </CardContent>
                    </Card>
                    <div className="mt-2 flex justify-center">
                      <SubmitButton disabled={processing}>{t("Enviar")}</SubmitButton>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </RegiwebLayout>
  );
}
