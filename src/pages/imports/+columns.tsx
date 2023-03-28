import { GridColDef } from "@mui/x-data-grid";
import MouseIcon from "@mui/icons-material/Mouse";

export const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "",
    headerAlign: "center",
    width: 200,
    renderHeader: () => <MouseIcon color="primary" />,
  },
  {
    field: "id",
    headerName: "Id",
    width: 50,
  },
  {
    field: "client",
    headerName: "Client",
    width: 300,
  },
  {
    field: "address",
    headerName: "address",
    width: 400,
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
