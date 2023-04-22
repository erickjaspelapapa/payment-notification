import { GridColDef } from "@mui/x-data-grid";

import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import NumericInput from "material-ui-numeric-input";

type ColumnEvent = {
  onEdit: (transid: number) => void;
  onDelete: (transId: number) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => (
        <Stack direction={"row"}>
          <IconButton onClick={() => onEdit(param.row.transId)}>
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => onDelete(param.row.transId)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      ),
    },
    {
      field: "id",
      headerName: "paymentId",
    },
    {
      field: "clientNumber",
      headerName: "Id",
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 200,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 200,
      valueFormatter: (param) => {
        if (param.value === null) {
          return "-";
        }
        const newDate = new Date(param.value);
        return format(newDate, "MMMM dd, yyyy");
      },
    },
    {
      field: "downpayment",
      headerName: "Downpayment",
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
          value={param.row.downpayment ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "reservation",
      headerName: "Reservation",
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
          value={param.row.reservation ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "monthlyPayment",
      headerName: "Monthly Payment",
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
          value={param.row.monthlyPayment ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "agentCommission",
      headerName: "Agent's Commission",
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
          value={param.row.agentCommission ?? 0}
          variant="outlined"
        />
      ),
    }, ///notarialFee
    {
      field: "notarialFee",
      headerName: "Notarial Fee",
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
          value={param.row.notarialFee ?? 0}
          variant="outlined"
        />
      ),
    }, ///promo
    {
      field: "promo",
      headerName: "Promo",
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
          value={param.row.promo ?? 0}
          variant="outlined"
        />
      ),
    }, ///promo
    {
      field: "transferFee",
      headerName: "Transfer Fee",
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
          value={param.row.transferFee ?? 0}
          variant="outlined"
        />
      ),
    }, ///remarks
    {
      field: "remarks",
      headerName: "Remarks",
      width: 400,
    }, ///remarks
  ];
};
