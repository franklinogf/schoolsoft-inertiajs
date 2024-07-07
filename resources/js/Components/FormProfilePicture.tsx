import { FilePondFile } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import { useTranslation } from "react-i18next";
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
);
export type SelectItemType = { key: string; value: string }[];
interface FormProfilePictureProps {
  label?: string;
  error?: string;
  value?: string;
  name?: string;
  onChange?: (files: FilePondFile[]) => void;
}
export function FormProfilePicture({
  label = "Foto de perfil",
  value,
  onChange,
  error,
  name = "picture",
}: FormProfilePictureProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="aspect-square size-[250px]">
        <FilePond
          files={value ? [value] : undefined}
          onupdatefiles={onChange}
          name={name}
          acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
          labelIdle={`${t("Arrastra y suelta")} ${t("o")} <span class="filepond--label-action">${t("Busca")}</span>`}
          imagePreviewHeight={170}
          imageCropAspectRatio="1:1"
          imageResizeTargetWidth={200}
          imageResizeTargetHeight={200}
          stylePanelLayout="compact circle"
          styleLoadIndicatorPosition="center bottom"
          styleProgressIndicatorPosition="right bottom"
          styleButtonRemoveItemPosition="center bottom"
          styleButtonProcessItemPosition="right bottom"
          credits={false}
        />
      </div>
      <p className="text-sm font-medium">{t(label)}</p>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
