import { FormInput } from "@/Components/FormInput";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
interface LoginFormProps {
  submitRoute: string;
  className?: string;
  errorMessage?: string | null;
}
export function LoginForm({ className, submitRoute, errorMessage }: LoginFormProps) {
  const { t } = useTranslation();
  const { data, setData, post, errors, processing } = useForm({
    username: "",
    password: "",
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
            <FormInput
              label={t("Usuario")}
              value={data.username}
              onChange={(e) => setData("username", e.target.value)}
              error={errors.username}
            />

            <FormInput
              label={t("Contraseña")}
              type="password"
              value={data.password}
              error={errors.password}
              onChange={(e) => setData("password", e.target.value)}
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
