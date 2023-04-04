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
    field: "clientId",
    headerName: "Id",
  },
  {
    field: "clientName",
    headerName: "Client",
    width: 300,
  },
  {
    field: "clientContactNumber",
    headerName: "Contact Number",
    width: 200,
  },
  {
    field: "bldgBlock",
    headerName: "Block",
  },
  {
    field: "bldgLot",
    headerName: "Lot",
  },
  {
    field: "totalContractPrice",
    headerName: "Contract Price",
    width: 250,
  },
  {
    field: "dateStartMonthlyPay",
    headerName: "First Monthly Pay",
    width: 250,
  },
  {
    field: "transferFee",
    headerName: "Transfer Fee",
    width: 250,
  },
  {
    field: "transTypeId",
    headerName: "Transfer Type",
    width: 250,
  },
  {
    field: "agentId",
    headerName: "Agent",
    width: 250,
  },
  {
    field: "projGrpId",
    headerName: "Project Group",
    width: 250,
  },
];
