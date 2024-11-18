import { LoginForm } from "@/Components/forms/LoginForm";
import { LOGIN_REGIWEB_PICTURE } from "@/Constants";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Page({ flash }: PageProps) {
  const { t } = useTranslation("pages");
  return (
    <>
      <Head title={t("regiweb.login.title")} />
      <div className="fle-col flex min-h-dvh items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
          <LoginForm
            errorMessage={flash.error}
            submitRoute={route("regiweb.login")}
            className="order-2 space-y-4 md:order-1"
          />
          <div className="order-1 max-md:mt-8 md:order-2 md:h-[300px] lg:h-[400px]">
            <img
              src={LOGIN_REGIWEB_PICTURE}
              className="mx-auto block h-full w-full object-contain max-md:w-4/5"
              alt={t("regiweb.login.imageAlt")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
