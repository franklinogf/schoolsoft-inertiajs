import { FieldError } from "@/Components/forms/inputs/FieldError";
import { FieldLabel } from "@/Components/forms/inputs/FieldLabel";
import { useTranslations } from "@/hooks/translations";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useId } from "react";
import { useDropzone } from "react-dropzone";
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
  const { t } = useTranslations();
  const id = useId();
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
          disabled ? "bg-muted cursor-not-allowed" : "bg-background cursor-pointer",
          { "border-destructive cursor-not-allowed": isDragReject },
        )}
      >
        <input id={id} {...getInputProps()} />
        <p
          className={cn(
            "text-input absolute z-20 text-center font-serif text-sm font-medium text-balance",
          )}
        >
          {isDragActive
            ? t("Drop an image here")
            : value
              ? t("Drag and drop an image here to change")
              : t("Drag and drop an image here or click to select")}
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
      <FieldLabel className="mt-1" id={id} label={label ?? t("Profile Picture")} error={error} />
      <FieldError error={error} />
    </div>
  );
}
