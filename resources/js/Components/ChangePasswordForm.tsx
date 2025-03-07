import { useTranslations } from "@/hooks/translations";
import { useForm } from "@inertiajs/react";
import { InputField } from "./forms/inputs/InputField";
import { Button } from "./ui/button";

export function ChangePasswordForm({ route }: { route: string }) {
  const { t } = useTranslations();
  const { data, setData, errors, processing, patch, reset } = useForm({
    clave: "",
    clave_confirmation: "",
  });
  return (
    <div className="mt-5 space-y-4">
      <h3 className="text-2xl leading-none font-semibold tracking-tight">
        {t("Cambiar Contraseña")}
      </h3>
      <InputField
        label={t("Nueva contraseña")}
        value={data.clave}
        onChange={(value) => setData("clave", value)}
        error={errors.clave}
        type="password"
      />
      <InputField
        label={t("Confirmar nueva contraseña")}
        value={data.clave_confirmation}
        onChange={(value) => setData("clave_confirmation", value)}
        error={errors.clave_confirmation}
        type="password"
      />
      <Button
        onClick={() => {
          patch(route, {
            preserveScroll: true,
            onSuccess: () => {
              reset();
            },
          });
        }}
        disabled={processing}
        size="sm"
      >
        {t("Cambiar Contraseña")}
      </Button>
    </div>
  );
}
