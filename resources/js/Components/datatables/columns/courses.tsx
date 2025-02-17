import { DataTableColumnHeader } from "@/Components/datatables/DataTableColumnHeader";
import { selectionHeader } from "@/Components/datatables/columns";
import { Course } from "@/types/teacher";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Partial<Course>>[] = [
  { ...(selectionHeader as ColumnDef<Partial<Course>>) },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Curso" />,
    accessorKey: "curso",
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descripción" />,
    accessorKey: "desc1",
  },
];
