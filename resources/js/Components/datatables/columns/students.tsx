import { DataTableColumnHeader } from "@/Components/datatables/DataTableColumnHeader";
import { selectionHeader } from "@/Components/datatables/columns";
import { ucwords } from "@/lib/utils";
import { Student } from "@/types/student";
import { ColumnDef } from "@tanstack/react-table";

export const studentsListingColumns: ColumnDef<Student>[] = [
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Apellidos" />,
    accessorKey: "apellidos",
    cell: ({ row }) => {
      const value = row.getValue("apellidos") as string;

      return ucwords(value);
    },
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    accessorKey: "nombre",
    cell: ({ row }) => {
      const value = row.getValue("nombre") as string;

      return ucwords(value);
    },
  },
];

export const studentsSelectionColumns: ColumnDef<Student>[] = [
  { ...(selectionHeader as ColumnDef<Student>) },
  ...studentsListingColumns,
];
