import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "Actions",
    width: 150,
  },
  {
    field: "id",
    headerName: "Id",
    width: 200,
  },
  {
    field: "client",
    headerName: "Client",
    width: 200,
  },
  {
    field: "address",
    headerName: "address",
    width: 200,
  },
  {
    field: "client_terms",
    headerName: "Terms",
    width: 200,
  },
  {
    field: "contract_price",
    headerName: "Contract Price",
    width: 200,
  },
  {
    field: "date_created",
    headerName: "Date Created",
    width: 200,
  },
];
