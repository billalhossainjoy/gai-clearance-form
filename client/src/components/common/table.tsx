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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronDown, ChevronUp, Loader, Search } from "lucide-react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { useState } from "react";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  loading,
}: Props<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: false,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading)
    return (
      <div className="flex w-full h-40 p-5 justify-center items-center">
        <div>
          <Loader className="animate-spin" />
        </div>
      </div>
    );

  return (
    <div>
      <div className=" flex justify-end">
        <div className="flex items-center gap-3 ">
          <span className="font-semibold">Search:</span>
          <div className="flex items-center gap-3 border rounded pr-3">
            <Input
              type="text"
              className="focus-visible:ring-0 focus-visible:outline-none shadow-none border-none w-480"
              placeholder="search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Search className="text-primary" />
          </div>
          <div>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(value) =>
                setPagination((prev) => ({ ...prev, pageSize: Number(value) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"10"}>10</SelectItem>
                <SelectItem value={"20"}>20</SelectItem>
                <SelectItem value={"50"}>40</SelectItem>
                <SelectItem value={"100"}>100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex gap-2 items-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === "asc" && (
                      <ChevronDown className="w-5 h-5" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <ChevronUp className="w-5 h-5" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className=" text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-5">
        <div className="flex gap-3">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            next
          </Button>
        </div>
        <div className="">
          <div className="w-full">
            <span>page {table.getState().pagination.pageIndex + 1}</span> of{" "}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
};
