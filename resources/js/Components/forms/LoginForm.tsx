import { AlertDestructive } from "@/Components/AlertDesctructive";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Teacher } from "@/types/Teacher";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { InputField } from "./inputs/InputField";
interface LoginFormProps {
  submitRoute: string;
  className?: string;
  errorMessage: string | null;
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
          <CardDescription>
            <AlertDestructive message={errorMessage} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <InputField
              label={t("Usuario")}
              data={data}
              setData={setData}
              name="usuario"
              error={errors.usuario}
            />
            <InputField
              label={t("Contraseña")}
              data={data}
              setData={setData}
              name="clave"
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
