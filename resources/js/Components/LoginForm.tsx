import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Teacher } from "@/types/auth";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { CustomFormField, FormFieldType } from "./CustomFormField";
interface LoginFormProps {
  submitRoute: string;
  className?: string;
  errorMessage?: string | null;
}
export function LoginForm({ className, submitRoute, errorMessage }: LoginFormProps) {
  const { t } = useTranslation();
  const { data, setData, post, errors, processing } = useForm<Pick<Teacher, "usuario" | "clave">>({
    usuario: "",
    clave: "",
  });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(submitRoute);
  }
  return (
    <form onSubmit={submit} className={className}>
      <Card className="max-w-md shadow-lg max-md:mx-auto">
        <CardHeader>
          <CardTitle>{t("Iniciar sesión")}</CardTitle>
          <CardDescription className="text-red-600">{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <CustomFormField
              label={t("Usuario")}
              data={data}
              setData={setData}
              name="usuario"
              fieldType={FormFieldType.INPUT}
              error={errors.usuario}
            />
            <CustomFormField
              label={t("Contraseña")}
              data={data}
              setData={setData}
              name="clave"
              fieldType={FormFieldType.INPUT}
              error={errors.clave}
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="grid gap-2">
          <Button disabled={processing}>{t("Acceder")}</Button>
          <Button variant="outline" asChild>
            <Link href={route("home.index")}>{t("Volver atrás")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
