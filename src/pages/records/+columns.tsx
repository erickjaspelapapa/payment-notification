import { Box, IconButton, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import NumericInput from "material-ui-numeric-input";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type ColumnEvent = {
  onShowProject: (id: string) => void;
};

export const columns = ({ onShowProject }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      width: 75,
      renderCell: (param) => (
        <IconButton onClick={() => onShowProject(param.row.clientId)}>
          <InfoIcon color="info" />
        </IconButton>
      ),
    },
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "clientId",
      headerName: "Id",
    },
    {
      field: "client",
      headerName: "Client",
      width: 250,
    },
    {
      field: "forProcessing",
      headerName: "",
      type: "Boolean",
      width: 50,
      renderCell: (param) => {
        return param.row.forProcessing ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        );
      },
    },
    {
      field: "latestPayment",
      headerName: "Latest Payment Date",
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
      field: "firstMonthlyPay",
      headerName: "First Monthly Payment",
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
      field: "firstMonthlyPayFormatted",
      headerName: "",
    },
    {
      field: "totalContractPrice",
      headerName: "Contract Price",
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
          value={param.row.totalContractPrice ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "projectedMonPaymentAmt",
      headerName: "Monthly Payment",
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
          value={param.row.projectedMonPaymentAmt ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "monthsToPay",
      headerName: "Months To Pay",
      width: 150,
      renderCell: (param) => {
        return (
          <Stack direction="row">
            <Typography color="red">{param.row.monthsToPay}</Typography>
            <Typography
              color="green"
              sx={{ marginLeft: 1, fontWeight: 600 }}
            >{`[ ${param.row.monthsPayLeft} ]`}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "agent",
      headerName: "Agent",
      width: 250,
    },

    {
      field: "agentCommission",
      headerName: "Agent's Commission",
      width: 150,
      renderCell: (param) => {
        return (
          <NumericInput
            precision={2}
            decimalChar="."
            thousandChar=","
            value={param.row.agentCommission ?? 0}
            variant="outlined"
            sx={{
              textAlignLast: "right",
            }}
          />
        );
      },
    },
    {
      field: "agentCommsPerc",
      headerName: "",
      width: 75,
      renderCell: (param) => (
        <Typography>{`[${param.row.agentCommsPerc}%]`}</Typography>
      ),
    },
    {
      field: "transferFee",
      headerName: "Transfer Fee",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.transferFee ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "notarialFee",
      headerName: "Notarial Fee",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.notarialFee ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "downpayment",
      headerName: "Downpayment",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.downpayment ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "downpaymentPerc",
      headerName: "",
      width: 75,
      renderCell: (param) => (
        <Typography>{`[${param.row.downpaymentPerc}%]`}</Typography>
      ),
    },
    {
      field: "reservation",
      headerName: "Reservation",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.reservation ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "promo",
      headerName: "Promo",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.promo ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "monthlyPayment",
      headerName: "Montly Payment",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.monthlyPayment ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "totalBalance",
      headerName: "Total Balance",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.totalBalance ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "totalPaid",
      headerName: "Total Paid",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.totalPaid ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
    {
      field: "trasnferFeePaid",
      headerName: "Transfer Fee Paid",
      width: 150,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.trasnferFeePaid ?? 0}
          variant="outlined"
          sx={{
            textAlignLast: "right",
          }}
        />
      ),
    },
  ];
};
