import { FieldsGrid } from "@/Components/forms/inputs/FieldsGrid";
import { InputField } from "@/Components/forms/inputs/InputField";
import { RegiwebLayout } from "@/Layouts/Regiweb/RegiwebLayout";

export default function Page() {
  return (
    <RegiwebLayout title="Tareas">
      <h1>Tareas</h1>
      <FieldsGrid cols={3}>
        <InputField label="Titulo" />
        <InputField label="Titulo" />
        <InputField label="Titulo" />
      </FieldsGrid>
    </RegiwebLayout>
  );
}
