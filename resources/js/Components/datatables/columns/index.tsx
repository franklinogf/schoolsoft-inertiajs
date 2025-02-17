import { Checkbox } from "@/Components/ui/checkbox";
import type { ColumnDef, RowData } from "@tanstack/react-table";

export const selectionHeader: ColumnDef<RowData> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      className="bg-background data-[state=checked]:bg-background data-[state=checked]:text-primary"
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),

  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};
