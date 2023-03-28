import { GridColDef } from "@mui/x-data-grid";
import MouseIcon from "@mui/icons-material/Mouse";

export const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "",
    headerAlign: "center",
    width: 150,
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
    width: 250,
  },
  {
    // Annual | Quarter | Monthly
    field: "client_terms",
    headerName: "Terms",
    flex: 1,
  },
  {
    //Cleared | For Payment | OverDue
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    // Sent | Pending
    field: "notif_status",
    headerName: "Notification",
    flex: 1,
  },
  {
    //Paid | Unpaid
    field: "payment_status",
    headerName: "Payment Status",
    flex: 1,
  },
  {
    field: "due_date",
    headerName: "Due Date",
    flex: 1,
  },
  {
    field: "contract_price",
    headerName: "Contract Price",
    flex: 1,
  },
  {
    field: "outstanding_balance",
    headerName: "Balance",
    flex: 1,
  },
  {
    field: "date_created",
    headerName: "Date Created",
    flex: 1,
  },
];
