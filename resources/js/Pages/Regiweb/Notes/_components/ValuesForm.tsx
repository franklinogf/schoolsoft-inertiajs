import { DateField } from "@/Components/forms/inputs/DateField";
import { InputField } from "@/Components/forms/inputs/InputField";
import SubmitButton from "@/Components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
export type GradesValues = {
  tema: string;
  valor: string;
  fecha: string;
};

export default function ValuesForm({ values, id }: { values: GradesValues[]; id: number }) {
  const { t } = useTranslation();
  const initialValue = values.reduce((acc, curr, i) => {
    const index = i + 1;
    return {
      ...acc,
      [`tema${index}`]: curr.tema,
      [`val${index}`]: curr.valor,
      [`fec${index}`]: curr.fecha,
    };
  }, {});
  const { put, processing, errors, data, setData } = useForm(initialValue);
  function handleValuesSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route("regiweb.notes.values.save", id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(t("Los valores han sido guardados correctamente"));
      },
    });
  }
  return (
    <form onSubmit={handleValuesSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{t("Valores")}</CardTitle>
          <CardDescription hidden></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="[&>th]:text-center">
                  <TableHead>{t("Tema")}</TableHead>
                  <TableHead>{t("Valor")}</TableHead>
                  <TableHead>{t("Fecha")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {values.map((_, i) => {
                  const index = i + 1;
                  return (
                    <TableRow className="[&>td]:text-center" key={i}>
                      <TableCell>
                        <InputField
                          data={data}
                          name={`tema${index}`}
                          setData={setData}
                          placeholder={t("Tema") + " " + index}
                          error={errors[`tema${index}` as keyof typeof errors]}
                        />
                      </TableCell>
                      <TableCell>
                        <InputField
                          removeArrows
                          data={data}
                          name={`val${index}`}
                          setData={setData}
                          placeholder={t("Valor") + " " + index}
                          type="number"
                          error={errors[`val${index}` as keyof typeof errors]}
                          onBlur={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <DateField
                          data={data}
                          name={`fec${index}`}
                          setData={setData}
                          placeholder={t("Fecha") + " " + index}
                          error={errors[`fec${index}` as keyof typeof errors]}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <SubmitButton size="lg" disabled={processing}>
            {t("Guardar")}
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
