import { DataTable } from "@/Components/custom-ui/data-table";
import { coursesSelectionColumns } from "@/Components/datatables/columns/courses";
import { studentsSelectionColumns } from "@/Components/datatables/columns/students";
import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { PhoneField } from "@/Components/forms/inputs/PhoneField";
import { SelectField } from "@/Components/forms/inputs/SelectField";
import SubmitButton from "@/Components/forms/SubmitButton";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { PHONE_COMPANIES_SELECT } from "@/Constants/FormSelects";
import { useTranslations } from "@/hooks/translations";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { Student } from "@/types/student";
import { Course } from "@/types/teacher";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export enum SmsSelectedEnum {
  STUDENTS = "students",
  COURSES = "courses",
  Individual = "individual",
}

interface PageProps {
  students: Student[];
  courses: Course[];
  selected: SmsSelectedEnum;
}

export default function Page({ students, courses, selected }: PageProps) {
  const [selectedTab, setSelectedTab] = useState<SmsSelectedEnum>(selected);
  const handleButtonClick = (data: string[]) => {
    router.get(route("regiweb.options.messages.sms.form"), { data, selected: selectedTab });
  };
  const { data, setData, errors, processing, get } = useForm("invididual", {
    phone: "",
    company: "",
    selected: selectedTab,
  });

  const { t } = useTranslations();

  return (
    <RegiwebLayout title={t("Mensajes de SMS")}>
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="pb-4 text-center text-2xl font-semibold">{t("Mensajes de SMS")}</h1>
        <Tabs
          value={selectedTab}
          onValueChange={(value) => {
            setSelectedTab(value as SmsSelectedEnum);
            setData("selected", value as SmsSelectedEnum);
            router.reload({ data: { selected: value }, replace: true });
          }}
        >
          <TabsList className="mx-auto">
            <TabsTrigger value={SmsSelectedEnum.STUDENTS}>{t("Estudiantes")}</TabsTrigger>
            <TabsTrigger value={SmsSelectedEnum.COURSES}>{t("Cursos")}</TabsTrigger>
            <TabsTrigger value={SmsSelectedEnum.Individual}>{t("Individual")}</TabsTrigger>
          </TabsList>
          <TabsContent value={SmsSelectedEnum.STUDENTS}>
            <DataTable
              rowId="ss"
              columns={studentsSelectionColumns}
              data={students}
              buttonLabel={t("Continuar")}
              onButtonClick={(data) => {
                const selectedStudents = data.map((student) => student.ss);
                router.get(route("regiweb.options.messages.sms.form"), {
                  data: selectedStudents,
                  selected: selectedTab,
                });
              }}
            />
          </TabsContent>
          <TabsContent value={SmsSelectedEnum.COURSES}>
            <DataTable
              rowId="curso"
              columns={coursesSelectionColumns}
              data={courses}
              buttonLabel={t("Continuar")}
              onButtonClick={(data) => {
                const selectedCourses = data.map((course) => course.curso);
                router.get(route("regiweb.options.messages.sms.form"), {
                  data: selectedCourses,
                  selected: selectedTab,
                });
              }}
            />
          </TabsContent>
          <TabsContent value={SmsSelectedEnum.Individual}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                get(route("regiweb.options.messages.sms.form"));
              }}
            >
              <Card className="mx-auto max-w-2xl">
                <CardContent>
                  <FieldsGrid cols={2}>
                    <PhoneField
                      value={data.phone}
                      onChange={(value) => setData("phone", value)}
                      label={t("Teléfono celular")}
                      error={errors.phone}
                    />
                    <SelectField
                      value={data.company}
                      onChange={(value) => setData("company", value)}
                      label={t("Compañía de teléfono celular")}
                      error={errors.company}
                      items={PHONE_COMPANIES_SELECT}
                    />
                  </FieldsGrid>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <SubmitButton disabled={processing}>{t("Continuar")}</SubmitButton>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </section>
    </RegiwebLayout>
  );
}
