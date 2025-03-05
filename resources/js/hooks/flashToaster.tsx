import { AlertDestructive } from "@/Components/AlertDesctructive";
import type { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function useFlashToaster() {
  const { props } = usePage<PageProps>();
  useEffect(() => {
    if (props.flash.success) {
      toast.success(props.flash.success);
    }
    if (props.flash.error) {
      toast.error(props.flash.error);
    }
    if (props.flash.errorList) {
      toast.error(<AlertDestructive message={props.flash.errorList} />);
    }
  }, [props.flash]);
}
