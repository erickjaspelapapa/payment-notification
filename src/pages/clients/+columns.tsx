import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import NumericInput from "material-ui-numeric-input";
import { useNavigate } from "react-router-dom";

type ColumnEvent = {
  onEdit: (clientId: number) => void;
  onDelete: (clientId: number) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  const navigate = useNavigate();
  return [
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (param) => (
        <Stack direction={"row"}>
          <IconButton
            onClick={() => navigate(`/clientProfile/${param.row.clientId}`)}
          >
            <InfoIcon color="info" />
          </IconButton>
          {/* <IconButton onClick={() => onEdit(param.row.id)}>
            <EditIcon color="secondary" />
          </IconButton> */}
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
    {
      field: "totalContractPrice",
      headerName: "Contract Price",
      align: "right",
      width: 200,
      renderCell: (param) => (
        // <NumericFormat
        //   displayType="text"
        //   value={param.row.totalContractPrice}
        //   thousandSeparator
        // />
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.totalContractPrice}
          variant="outlined"
        />
      ),
    },
    {
      field: "transferFee",
      headerName: "Transfer Fee",
      align: "right",
      width: 200,
      renderCell: (param) => (
        // <NumericFormat
        //   displayType="text"
        //   value={param.row.transferFee}
        //   thousandSeparator
        // />
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.transferFee}
        />
      ),
    },
  ];
};
