import { SelectField } from "@/Components/forms/inputs/SelectField";
import { OptionsForm } from "@/Components/OptionsForm";
import {
  createSelectItemsFromArrayOfObjects,
  PAGES_SELECT,
  TRIMESTER_SELECT,
} from "@/Constants/FormSelects";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";
import { PagePropsWithUser } from "@/types";
import { Teacher } from "@/types/teacher";
import { useForm } from "@inertiajs/react";

export default function Page({ auth: { user } }: PagePropsWithUser<Teacher>) {
  const { data, setData, processing, get } = useForm({
    course: user.cursos?.[0].curso ?? "",
    trimester: TRIMESTER_SELECT[0].key,
    page: PAGES_SELECT[0].key,
  });
  const handleSubmit = () => {
    get(
      route("regiweb.reports.index", {
        course: data.course,
        trimester: data.trimester,
        page: data.page,
      }),
    );
  };
  return (
    <RegiwebLayout title="Informes">
      <OptionsForm
        submitting={processing}
        onSubmit={handleSubmit}
        submitLabel="Ver informe"
        title="Seleccionar informe"
      >
        <SelectField
          label="Curso"
          items={createSelectItemsFromArrayOfObjects(user.cursos, {
            separator: " - ",
            key: "curso",
            values: ["curso", "descripcion"],
          })}
          value={data.course}
          onChange={(value) => setData("course", value)}
        />
        <SelectField
          label="Trimestre"
          items={TRIMESTER_SELECT}
          value={data.trimester}
          onChange={(value) => setData("trimester", value)}
        />
        <SelectField
          label="Pagina"
          items={PAGES_SELECT}
          value={data.page}
          onChange={(value) => setData("page", value)}
        />
      </OptionsForm>
    </RegiwebLayout>
  );
}
