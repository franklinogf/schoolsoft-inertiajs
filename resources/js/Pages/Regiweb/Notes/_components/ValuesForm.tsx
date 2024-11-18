import { DateField } from "@/Components/forms/inputs/DateField";
import { InputField } from "@/Components/forms/inputs/InputField";
import SubmitButton from "@/Components/forms/SubmitButton";
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
  [x: string]: string;
};

interface ValuesFormProps {
  values: GradesValues;
  id: number;
  amoutOfGrades: number;
  onValueChange: (valueKey: string, value: string) => void;
}

export function ValuesForm({ values, id, amoutOfGrades, onValueChange }: ValuesFormProps) {
  const { t } = useTranslation(["common", "pages"]);
  const { put, processing, errors, data, setData } = useForm(values);

  function handleValuesSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route("regiweb.notes.values.save", id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(t("pages:regiweb.notes.show.successMessage.exam"));
      },
    });
  }
  return (
    <form onSubmit={handleValuesSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{t("values")}</CardTitle>
          <CardDescription hidden></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="[&>th]:text-center">
                  <TableHead>{t("topic")}</TableHead>
                  <TableHead>{t("value")}</TableHead>
                  <TableHead>{t("date.label")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: amoutOfGrades }).map((_, i) => {
                  const index = i + 1;
                  return (
                    <TableRow className="[&>td]:text-center" key={i}>
                      <TableCell>
                        <InputField
                          data={data}
                          name={`tema${index}`}
                          setData={setData}
                          placeholder={t("topic") + " " + index}
                          error={errors[`tema${index}` as keyof typeof errors]}
                        />
                      </TableCell>
                      <TableCell>
                        <InputField
                          removeArrows
                          data={data}
                          name={`val${index}`}
                          setData={setData}
                          placeholder={t("value") + " " + index}
                          type="number"
                          error={errors[`val${index}` as keyof typeof errors]}
                          onBlur={(e) => {
                            onValueChange("val" + index, e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <DateField
                          data={data}
                          name={`fec${index}`}
                          setData={setData}
                          placeholder={t("date.label") + " " + index}
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
            {t("btn.save")}
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
