import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { InputField } from "./forms/inputs/InputField";
import { Button } from "./ui/button";

export function ChangePasswordForm({ route }: { route: string }) {
  const { t } = useTranslation();
  const { data, setData, errors, processing, patch, reset } = useForm({
    clave: "",
    clave_confirmation: "",
  });
  return (
    <div className="mt-5 space-y-4">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        {t("Cambiar contraseña")}
      </h3>
      <InputField
        data={data}
        setData={setData}
        label={t("Nueva contraseña")}
        name="clave"
        error={errors.clave}
        type="password"
      />
      <InputField
        data={data}
        setData={setData}
        label={t("Confirmar nueva contraseña")}
        name="clave_confirmation"
        error={errors.clave_confirmation}
        type="password"
      />
      <Button
        onClick={() => {
          patch(route, {
            preserveScroll: true,
            onSuccess: () => {
              toast.success(t("Contraseña cambiada"));
              reset();
            },
          });
        }}
        disabled={processing}
        size="sm"
      >
        {t("Cambiar contraseña")}
      </Button>
    </div>
  );
}
