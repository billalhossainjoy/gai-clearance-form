import { createColumnHelper } from "@tanstack/react-table";
import StudentActionButton from "../allStudent/list/action";

export interface Student {
  id: string;
  name: string;
  technology: "PT" | "GD" | "CST";
  roll: number;
  registrationNo: number;
  session: string;
  shift: "FIRST" | "SECOND";
  active: boolean;
}

const column = createColumnHelper<Student>();

export const blockListsColumns = [
  column.display({
    id: "serial",
    header: "Serial",
    cell: ({ row }) => row.index + 1,
  }),
  column.accessor("name", {
    header: "Name",
    cell: (row) => row.getValue(),
  }),
  column.accessor("technology", {
    header: "Technology",
    cell: (row) => row.getValue(),
  }),
  column.accessor("roll", {
    header: "Roll",
    cell: (row) => row.getValue(),
  }),
  column.accessor("registrationNo", {
    header: "Reg",
    cell: (row) => row.getValue(),
  }),
  column.accessor("session", {
    header: "Session",
    cell: (row) => row.getValue(),
  }),
  column.accessor("shift", {
    header: "Shift",
    cell: (row) => row.getValue(),
  }),
  column.accessor("active", {
    header: "Active",
    cell: (row) => (row.getValue() ? "Active" : "Block"),
  }),
  column.display({
    id: "action",
    cell: ({ row }) => (
      <StudentActionButton id={row.original.id} update deleteAction />
    ),
  }),
];
