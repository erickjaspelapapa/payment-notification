import { IconButton, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import NumericInput from "material-ui-numeric-input";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";

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
          value={param.row.totalContractPrice ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "projectedMonPaymentAmt",
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
          value={param.row.projectedMonPaymentAmt ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "monthsToPay",
      headerName: "Months To Pay",
      width: 150,
      renderCell: (param) => (
        <Stack direction="row">
          <Typography color="red">{param.row.monthsToPay}</Typography>
          <Typography
            color="green"
            sx={{ marginLeft: 1 }}
          >{`[ ${param.row.monthsToPay} ]`}</Typography>
        </Stack>
      ),
    },
    {
      field: "agent",
      headerName: "Agent",
      width: 250,
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
        <Stack direction="row">
          <NumericInput
            precision={2}
            decimalChar="."
            thousandChar=","
            value={param.row.agentCommission ?? 0}
            variant="outlined"
          />
          {/* <Typography>{`[${18}%]`}</Typography> */}
        </Stack>
      ),
    },
    {
      field: "transferFee",
      headerName: "Transfer Fee",
      align: "right",
      width: 200,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.transferFee ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "notarialFee",
      headerName: "Notarial Fee",
      align: "right",
      width: 200,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.notarialFee ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "downpayment",
      headerName: "Downpayment",
      align: "right",
      width: 200,
      renderCell: (param) => (
        <Stack>
          <NumericInput
            precision={2}
            decimalChar="."
            thousandChar=","
            value={param.row.downpayment ?? 0}
            variant="outlined"
          />
          {/* <Typography>{`[${18}%]`}</Typography> */}
        </Stack>
      ),
    },
    {
      field: "reservation",
      headerName: "Reservation",
      align: "right",
      width: 200,
      renderCell: (param) => (
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
      field: "promo",
      headerName: "Promo",
      align: "right",
      width: 200,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.promo ?? 0}
          variant="outlined"
        />
      ),
    },
    {
      field: "monthlyPayment",
      headerName: "Montly Payment",
      align: "right",
      width: 200,
      renderCell: (param) => (
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
      field: "totalBalance",
      headerName: "Total Balance",
      align: "right",
      width: 200,
    },
    {
      field: "totalPaid",
      headerName: "Total Paid",
      align: "right",
      width: 200,
    },
    {
      field: "trasnferFeePaid   ",
      headerName: "Transfer Fee Paid",
      align: "right",
      width: 200,
    },
  ];
};
