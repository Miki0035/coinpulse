import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "cn";

const DataTable = <T,>({
  columns,
  data,
  rowkey,
  tableClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassname,
  bodyCellClassName,
  headerClassName,
}: DataTableProps<T>) => {
  return (
    <Table className={cn("custom-scrollbar", tableClassName)}>
      <TableHeader className={headerClassName}>
        <TableRow className={cn("hover:bg-transparent!", headerRowClassName)}>
          {columns.map((column, i) => {
            return (
              <TableHead
                key={i}
                className={cn(
                  "bg-dark-400 text-purple-100 py-4 first:pl-5 last:pr-5",
                )}
              >
                {column.header}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowkey(row, rowIndex)}
            className={cn(
              "overflow-hidden rounded-lg border-purple-100/5 hover:bg-dark-400/30! relative",
              bodyRowClassname,
            )}
          >
            {columns.map((column, columnIndex) => (
              <TableCell
                key={columnIndex}
                className={cn("py-4 first:pl-5 last:pr-5")}
              >
                {column.cell(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
