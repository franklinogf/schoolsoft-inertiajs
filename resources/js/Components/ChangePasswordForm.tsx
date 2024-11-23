import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { InputField } from "./forms/inputs/InputField";
import { Button } from "./ui/button";

export function ChangePasswordForm({ route }: { route: string }) {
  const { t } = useTranslation(["input", "common"]);
  const { data, setData, errors, processing, patch, reset } = useForm({
    clave: "",
    clave_confirmation: "",
  });
  return (
    <div className="mt-5 space-y-4">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        {t("common:changePassword")}
      </h3>
      <InputField
        label={t("input:newPassword")}
        value={data.clave}
        onChange={(value) => setData("clave", value)}
        error={errors.clave}
        type="password"
      />
      <InputField
        label={t("input:confirmNewPassword")}
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
              toast.success(t("common:changePasswordSuccess"));
              reset();
            },
          });
        }}
        disabled={processing}
        size="sm"
      >
        {t("common:btn.changePassword")}
      </Button>
    </div>
  );
}
