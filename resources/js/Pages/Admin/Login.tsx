import FormInput from "@/Components/FormInput";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { PagePropsWithFlashMessage } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function AdminLoginPage({ flash }: PagePropsWithFlashMessage) {
  const { t } = useTranslation();
  const { data, setData, post, errors, processing } = useForm({
    username: "",
    password: "",
  });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("admin.login"));
  }

  return (
    <>
      <Head title="Login" />
      <div className="fle-col flex min-h-dvh items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
          <form onSubmit={submit} className="order-2 space-y-4 md:order-1">
            <Card className="max-w-md shadow-lg max-md:mx-auto">
              <CardHeader>
                <CardTitle>{t("Iniciar sesión")}</CardTitle>
                <CardDescription className="text-red-600">{flash?.message}</CardDescription>
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
          <div className="order-1 max-md:mt-8 md:order-2 md:h-[300px] lg:h-[400px]">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="mx-auto block h-full w-full object-cover max-md:w-4/5"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </>
  );
}
