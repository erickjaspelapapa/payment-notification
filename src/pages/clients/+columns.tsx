import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";

type ColumnEvent = {
  onEdit: (clientId: number) => void;
  onDelete: (clientId: number) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (param) => (
        <Stack direction={"row"}>
          <IconButton>
            <InfoIcon color="success" />
          </IconButton>
          <IconButton onClick={() => onEdit(param.row.id)}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => onDelete(param.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ),
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
      width: 150,
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
      align: "right",
      renderCell: (param) => (
        <NumericFormat
          displayType="text"
          value={param.row.totalContractPrice}
          thousandSeparator
        />
      ),
    },
    {
      field: "dateStartMonthlyPay",
      headerName: "First Monthly Pay",
      width: 150,
      valueFormatter: (param) => {
        if (param.value === null) {
          return "-";
        }
        const newDate = new Date(param.value);
        return format(newDate, "MMMM dd, yyyy");
      },
    },
    {
      field: "transTypeId",
      headerName: "Transfer Type",
      width: 250,
      valueGetter: (param) => param.row.transType.transTypeDescription ?? "-",
    },
    {
      field: "transferFee",
      headerName: "Transfer Fee",
      align: "right",
      renderCell: (param) => (
        <NumericFormat
          displayType="text"
          value={param.row.transferFee}
          thousandSeparator
        />
      ),
    },
    {
      field: "agentId",
      headerName: "Agent",
      width: 250,
      valueGetter: (param) =>
        `${param.row.agent.agentFirstName} ${param.row.agent.agentLastName}` ??
        "-",
    },
    {
      field: "projGrpId",
      headerName: "Project Group",
      width: 250,
      valueGetter: (param) => param.row.projGroup.projGrpDescription ?? "-",
    },
  ];
};
