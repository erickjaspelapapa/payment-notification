import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "agentFirstName",
    headerName: "First Name",
    width: 360,
  },
  {
    field: "agentLastName",
    headerName: "Last Name",
    width: 360,
  },
];
