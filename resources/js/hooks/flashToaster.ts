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
      toast.error(Object.values(props.flash.errorList).join("<br>"));
    }
  }, [props.flash]);
}
