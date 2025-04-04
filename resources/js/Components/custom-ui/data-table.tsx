import { DataTablePagination } from "@/Components/datatables/DataTablePagination";
import { InputField } from "@/Components/forms/inputs/InputField";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { useTranslations } from "@/hooks/translations";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { XSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onButtonClick?: (data: TData[]) => void;
  buttonLabel?: string;
  filter?: boolean;
  selectOne?: boolean;
  rowId: keyof TData;
  createButton?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onButtonClick,
  buttonLabel,
  filter = true,
  selectOne = false,
  rowId,
  createButton,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: !selectOne,
    state: { sorting, globalFilter, rowSelection },
    getRowId: (row: TData) => row[rowId as keyof TData] as string,
  });
  const { t } = useTranslations();
  return (
    <div>
      <div className="flex items-center justify-between py-2">
        {createButton}
        {filter && (
          <div className="relative ml-auto">
            <InputField
              placeholder="Filter"
              value={globalFilter}
              onChange={(value) => {
                table.setGlobalFilter(value);
              }}
            />
            {globalFilter && (
              <Button
                onClick={() => {
                  table.setGlobalFilter("");
                }}
                asChild
                className="size-4"
                size="icon"
                variant="ghost"
              >
                <XSquare className="hover:text-primary absolute top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer" />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-primary/80 hover:bg-primary/80">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-primary-foreground py-1"
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-background/80">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => {
                    buttonLabel && row.toggleSelected();
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="p-3" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t("No hay resultados")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-1">
        <DataTablePagination table={table} />
      </div>
      {buttonLabel && (
        <div className="mt-4 flex justify-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              if (!onButtonClick) return;
              if (table.getSelectedRowModel().rows.length === 0) {
                toast.info("Please select at least one row");
              } else {
                onButtonClick(table.getSelectedRowModel().rows.map((row) => row.original));
              }
            }}
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
