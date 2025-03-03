import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { useTranslations } from "@/hooks/translations";
import { Teacher } from "@/types/teacher";
import { Link, useForm } from "@inertiajs/react";
import { InputField } from "./inputs/InputField";
import SubmitButton from "./SubmitButton";
interface LoginFormProps {
  submitRoute: string;
  className?: string;
}
export function LoginForm({ className, submitRoute }: LoginFormProps) {
  const { t } = useTranslations();
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
          <CardTitle>{t("Log in")}</CardTitle>
          <CardDescription hidden></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <InputField
              label={t("Username")}
              value={data.usuario}
              onChange={(value) => setData("usuario", value)}
              error={errors.usuario}
            />
            <InputField
              label={t("Password")}
              value={data.clave}
              onChange={(value) => setData("clave", value)}
              error={errors.clave}
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="grid gap-2">
          <SubmitButton disabled={processing}>{t("Access")}</SubmitButton>
          <Button variant="outline" asChild>
            <Link href={route("home.index")}>{t("Back")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
