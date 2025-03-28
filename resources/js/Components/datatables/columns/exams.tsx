import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { YesNoEnum } from "@/Enums";
import { useTranslations } from "@/hooks/translations";
import useConfirmationStore from "@/stores/confirmationStore";
import { Exam } from "@/types/exam";
import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckIcon,
  Edit2Icon,
  EyeIcon,
  EyeOffIcon,
  MoreHorizontalIcon,
  PrinterIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

export const examsListingColumns: ColumnDef<Exam>[] = [
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Título" />,
    accessorKey: "titulo",
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Curso" />,
    accessorKey: "curso",
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Activo" />,
    cell: ({ row }) => {
      return (
        <Badge
          className="size-6 rounded-full p-0"
          variant={row.getValue("activo") === YesNoEnum.YES ? "default" : "destructive"}
        >
          {row.getValue("activo") === YesNoEnum.YES ? (
            <CheckIcon className="size-6" />
          ) : (
            <XIcon className="size-6" />
          )}
        </Badge>
      );
    },
    enableSorting: false,
    accessorKey: "activo",
  },
  {
    id: "Actions",
    size: 0,
    cell: ({ row }) => {
      const { t } = useTranslations();
      const { openConfirmation } = useConfirmationStore();
      const exam = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontalIcon />
              <span className="sr-only">{t("Abrir menu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={route("regiweb.options.exams.edit", exam.id)}>
                <Edit2Icon />
                <span>{t("Editar")}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link
                className="w-full"
                method="patch"
                href={route("regiweb.options.exams.toggle", exam.id)}
              >
                {exam.activo === YesNoEnum.YES ? <EyeOffIcon /> : <EyeIcon />}
                <span>{exam.activo === YesNoEnum.YES ? t("Desactivar") : t("Activar")}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PrinterIcon />
                {t("Imprimir")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="cursor-pointer">{t("Carta")}</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">{t("Hoja legal")}</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                openConfirmation({
                  title: t("Eliminar :label", { label: t("Examen").toLowerCase() }),
                  description: t("¿Está seguro de que desea eliminar este :label?", {
                    label: t("Examen").toLowerCase(),
                  }),
                  actionLabel: t("Eliminar"),
                  cancelLabel: t("Cancelar"),
                  actionVariant: "destructive",
                  onAction: () => {
                    router.delete(route("regiweb.options.exams.destroy", exam.id));
                  },
                });
              }}
            >
              <Trash2Icon />
              {t("Eliminar")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
