import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useId } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
type FileWithPreview = File & { preview?: string };

interface ProfilePictureFieldProps {
  label?: string;
  error?: string;
  initialFile?: string;
  disabled?: boolean;
  value?: File | null;
  onChange?: (value: File | null) => void;
}

export function ProfilePictureField({
  label,
  initialFile,
  error,
  disabled,
  value,
  onChange,
}: ProfilePictureFieldProps) {
  const { t } = useTranslation("input", { keyPrefix: "profilePictureDragDrop" });
  const id = useId();
  const labelToUse = label ?? t("defaultLabel");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      onChange && onChange(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 1,
    disabled,
    multiple: false,
    accept: { "image/*": [] },
  });
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (value) {
        if (value && (value as FileWithPreview).preview) {
          URL.revokeObjectURL((value as FileWithPreview).preview!);
        }
      }
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex aspect-square size-[250px] items-center justify-center overflow-hidden rounded-full border-2 border-dashed px-2 shadow-xs",
          disabled ? "cursor-not-allowed bg-muted" : "cursor-pointer bg-background",
          { "cursor-not-allowed border-destructive": isDragReject },
        )}
      >
        <input id={id} {...getInputProps()} />
        <p
          className={cn(
            "absolute z-20 text-balance text-center font-serif text-sm font-medium text-input",
          )}
        >
          {isDragActive ? t("status.active") : value ? t("status.change") : t("status.inactive")}
        </p>
        {value || initialFile ? (
          <div className="absolute">
            <img
              src={value ? (value as FileWithPreview).preview : initialFile}
              className="z-10 aspect-square object-cover"
              onLoad={() => {
                if (value && (value as FileWithPreview).preview)
                  URL.revokeObjectURL((value as FileWithPreview).preview!);
              }}
            />
          </div>
        ) : null}
      </div>
      <FieldLabel className="mt-1" id={id} label={labelToUse} error={error} />
      <FieldError error={error} />
    </div>
  );
}
