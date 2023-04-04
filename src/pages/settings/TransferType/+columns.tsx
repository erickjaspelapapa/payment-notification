import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "transTypeDescription",
    headerName: "Transfer Type",
    width: 500,
  },
];
