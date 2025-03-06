import { FileField } from "./FileField";

interface ProfilePictureFieldProps {
  label?: string;
  error?: string;
  initialFile?: string;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
}

export function ProfilePictureField({
  label,
  initialFile,
  error,
  disabled,
  onChange,
}: ProfilePictureFieldProps) {
  label = label ?? "Profile Picture";
  return (
    <FileField
      label={label}
      error={error}
      disabled={disabled}
      className="size-50 text-center"
      labelIdle="Drag and drop your picture here"
      imagePreviewHeight={100}
      allowMultiple={false}
      initialFiles={initialFile ? [initialFile] : []}
      onChange={onChange}
      //   imageCropAspectRatio="1:1"
      //   imageResizeTargetWidth={200}
      //   imageResizeTargetHeight={200}
      //   imageResizeMode="compact circle"
      stylePanelLayout={"compact circle"}
      styleLoadIndicatorPosition="center bottom"
      styleProgressIndicatorPosition="center bottom"
      styleButtonRemoveItemPosition="center bottom"
      styleButtonProcessItemPosition="center bottom"
    />
  );
}
