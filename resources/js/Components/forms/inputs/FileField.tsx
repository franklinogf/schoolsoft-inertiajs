import { useTranslations } from "@/hooks/translations";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { FilePondFile } from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useRef, useState } from "react";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import { FieldContainer } from "./FieldContainer";
import { FieldError } from "./FieldError";
import { FieldLabel } from "./FieldLabel";
registerPlugin(FilePondPluginImagePreview);
interface FileFieldProps
  extends Pick<
    FilePondProps,
    "allowMultiple" | "maxFiles" | "acceptedFileTypes" | "dropOnPage" | "allowImagePreview"
  > {
  onChange?: (files: string[]) => void;
  initialFiles?: string[];
  label?: string;
  error?: string;
  disabled?: boolean;
}
export function FileField({
  label,
  error,
  disabled,
  initialFiles,
  onChange,
  allowImagePreview = true,
  ...props
}: FileFieldProps) {
  const { t } = useTranslations();
  const { csrf_token } = usePage<PageProps>().props;
  const [files, setFiles] = useState<FilePondFile[]>([]);

  const filePondRef = useRef<FilePond | null>(null);

  return (
    <FieldContainer>
      <FieldLabel label={label} error={error} />
      <FilePond
        disabled={disabled}
        allowImagePreview={allowImagePreview}
        ref={filePondRef}
        className="w-full"
        labelIdle={t(
          'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
        )}
        files={(files as unknown as string[]) ?? initialFiles}
        credits={false}
        server={{
          url: "/upload",
          headers: {
            "X-CSRF-TOKEN": csrf_token,
          },
        }}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem));
        }}
        onprocessfiles={() => {
          onChange?.(filePondRef.current?.getFiles().map((file) => file.serverId) ?? []);
        }}
        onremovefile={() => {
          onChange?.(filePondRef.current?.getFiles().map((file) => file.serverId) ?? []);
        }}
        {...props}
      />
      <FieldError error={error} />
    </FieldContainer>
  );
}
