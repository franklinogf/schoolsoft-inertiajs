import SubmitButton from "@/Components/forms/SubmitButton";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { useTranslations } from "@/hooks/translations";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalFormProps {
  children?: React.ReactNode;
  buttonLabel: string;
  buttonClassname?: string;
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  title: string;
  description?: string;
  submitLabel: string;
  onSubmit?: () => void;
  onClose?: () => void;
  submitting?: boolean;
}
export function ModalForm({
  children,
  buttonClassname,
  buttonVariant = "outline",
  buttonLabel,
  title,
  description,
  submitLabel,
  className,
  onSubmit,
  onClose,
  submitting,
}: ModalFormProps) {
  const { t } = useTranslations();
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          onClose && onClose();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassname}>
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("max-w-sm", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription hidden={description !== undefined}>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit();
          }}
        >
          {children}
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {t("Cerrar")}
              </Button>
            </DialogClose>
            <SubmitButton isSubmitting={submitting}>{submitLabel}</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
