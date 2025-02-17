import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
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
import { DataTablePagination } from "../datatables/DataTablePagination";
import { InputField } from "../forms/inputs/InputField";

interface DataTableProps<Tdata, TValue> {
  columns: ColumnDef<Tdata, TValue>[];
  data: Tdata[];
  onButtonClick?: (data: Tdata[]) => void;
  buttonLabel?: string;
  filter?: boolean;
}

export function DataTable<Tdata, TValue>({
  columns,
  data,
  onButtonClick,
  buttonLabel,
  filter = true,
}: DataTableProps<Tdata, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
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

    state: { sorting, globalFilter, rowSelection },
  });

  return (
    <div>
      {filter && (
        <div className="flex items-center justify-end py-4">
          <div className="relative">
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
                <XSquare className="absolute top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                  No results
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
        <div className="flex justify-center mt-4">
          <Button
          className="cursor-pointer"
            onClick={() => {
              onButtonClick &&
                onButtonClick(table.getSelectedRowModel().rows.map((row) => row.original));
            }}
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
