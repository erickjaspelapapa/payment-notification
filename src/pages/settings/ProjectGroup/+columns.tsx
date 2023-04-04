import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "projGrpDescription",
    headerName: "Project Group",
    width: 500,
  },
];
