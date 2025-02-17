import { DataTableColumnHeader } from "@/Components/datatables/DataTableColumnHeader";
import { selectionHeader } from "@/Components/datatables/columns";
import { Admin } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Partial<Admin>>[] = [
  { ...(selectionHeader as ColumnDef<Partial<Admin>>) },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Administrador" />,
    accessorKey: "director",
  },
];
