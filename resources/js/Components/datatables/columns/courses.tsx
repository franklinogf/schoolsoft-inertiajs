import { DataTableColumnHeader } from "@/Components/datatables/DataTableColumnHeader";
import { selectionHeader } from "@/Components/datatables/columns";
import { Course } from "@/types/teacher";
import { ColumnDef } from "@tanstack/react-table";

export const coursesListingColumns: ColumnDef<Course>[] = [
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Curso" />,
    accessorKey: "curso",
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descripción" />,
    accessorKey: "descripcion",
  },
];

export const coursesSelectionColumns: ColumnDef<Course>[] = [
  { ...(selectionHeader as ColumnDef<Course>) },
  ...coursesListingColumns,
];
