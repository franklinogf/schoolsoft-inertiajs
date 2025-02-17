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
import { Teacher } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { InputField } from "./inputs/InputField";
import SubmitButton from "./SubmitButton";
interface LoginFormProps {
  submitRoute: string;
  className?: string;
  errorMessage: string | null;
}
export function LoginForm({ className, submitRoute, errorMessage }: LoginFormProps) {
  const { t } = useTranslation(["input", "common"]);
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
          <CardTitle>{t("signIn", { ns: "common" })}</CardTitle>
          <CardDescription>
            <AlertDestructive message={errorMessage} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <InputField
              label={t("username", { ns: "input" })}
              value={data.usuario}
              onChange={(value) => setData("usuario", value)}
              error={errors.usuario}
            />
            <InputField
              label={t("password", { ns: "input" })}
              value={data.clave}
              onChange={(value) => setData("clave", value)}
              error={errors.clave}
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="grid gap-2">
          <SubmitButton disabled={processing}>{t("btn.access", { ns: "common" })}</SubmitButton>
          <Button variant="outline" asChild>
            <Link href={route("home.index")}>{t("btn.back", { ns: "common" })}</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
