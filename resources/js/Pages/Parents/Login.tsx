import { LoginForm } from "@/Components/LoginForm";
import { PagePropsWithFlashMessage } from "@/types";
import { Head } from "@inertiajs/react";

export default function AdminLoginPage({ flash }: PagePropsWithFlashMessage) {
  return (
    <>
      <Head title="Login" />
      <div className="fle-col flex min-h-dvh items-center justify-center px-4 py-6">
        <div className="grid w-full max-w-6xl items-center gap-4 md:grid-cols-2">
          <LoginForm
            errorMessage={flash?.message}
            submitRoute={route("parents.login")}
            className="order-2 space-y-4 md:order-1"
          />
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
