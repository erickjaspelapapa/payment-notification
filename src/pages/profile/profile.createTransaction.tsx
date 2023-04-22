import React from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TaskIcon from "@mui/icons-material/Task";

import { paymentLine, paymentPayload, paymentTypes } from "../../types";

const defaultPaymentLine: paymentLine = {
  paymentType: "",
  amount: 0,
  created_dt: new Date(),
  updated_dt: new Date(),
  transId: 0,
  id: 0,
};

type LineContainerProps = {
  line: paymentLine;
  setLine: (line: paymentLine) => void;
  removeLine: () => void;
};
const LineContainer = ({ line, setLine, removeLine }: LineContainerProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        border: "solid 1px gray",
        borderRadius: "10px",
        paddingLeft: 3,
        paddingRight: 3,
        margin: 1,
      }}
    >
      <Typography
        sx={{
          alignSelf: "center",
          marginBottom: 1,
          marginTop: 1,
          flex: 1,
        }}
      >
        {line.paymentType}
      </Typography>
      <TextField
        name="amount"
        label="Amount"
        value={line.amount}
        inputProps={{ type: "number", pattern: "[0-9]*" }}
        onChange={(evt) =>
          setLine({
            ...line,
            amount: parseFloat(evt.target.value),
          })
        }
        size="small"
        variant="standard"
        sx={{
          textAlignLast: "right",
          marginBottom: 1,
          marginTop: 1,
          marginLeft: 1,
          flex: 1,
        }}
      />
      <IconButton onClick={removeLine}>
        <CancelIcon />
      </IconButton>
    </Stack>
  );
};

type CreateTransactionProps = {
  payment: paymentPayload;
  setPayment: (payment?: paymentPayload) => void;
  submitTransaction: (payment: paymentPayload) => void;
};

const CreateTransaction = ({
  payment,
  setPayment,
  submitTransaction,
}: CreateTransactionProps) => {
  const [paymentLine, setPaymentLine] =
    React.useState<paymentLine>(defaultPaymentLine);

  const onEventChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (payment)
      setPayment({
        ...payment,
        [name]: value,
      });
  };

  const handleAddLines = () => {
    if (paymentLine.paymentType !== "" && paymentLine.amount > 0) {
      // payment?.lines.push(paymentLine);
      const currPayment = { ...payment };
      currPayment.lines?.push(paymentLine);

      //Try to merge/sum paymentType As much Aas Possible

      setPayment(currPayment);
      setPaymentLine(defaultPaymentLine);
    }
  };

  const handleClearPayment = () => {
    setPayment();
    setPaymentLine(defaultPaymentLine);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Stack
              direction="row"
              sx={{
                background: "",
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  name="TransactionType"
                  value={paymentLine.paymentType}
                  label="Age"
                  onChange={(evt) => {
                    setPaymentLine({
                      ...paymentLine,
                      paymentType: evt.target.value,
                    });
                  }}
                  size="small"
                  sx={{ marginBottom: 1, marginTop: 1 }}
                >
                  {Object.keys(paymentTypes).map((type) => (
                    <MenuItem key={type} value={type}>
                      {paymentTypes[type]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="amount"
                label="Amount"
                value={paymentLine.amount}
                inputProps={{ type: "number", pattern: "[0-9]*" }}
                onChange={(evt) =>
                  setPaymentLine({
                    ...paymentLine,
                    amount: parseFloat(evt.target.value),
                  })
                }
                variant="outlined"
                size="small"
                sx={{ marginBottom: 1, marginTop: 1, marginLeft: 1, flex: 1 }}
              />
              <IconButton
                onClick={() => {
                  handleAddLines();
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ height: "30rem", maxHeight: "30rem", overflow: "overlay" }}>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              Transactions
            </Typography>
            {payment?.lines?.map((line, index) => (
              <LineContainer
                key={index}
                line={line}
                setLine={(line) => {
                  const currPayment = { ...payment };
                  currPayment.lines?.splice(index, 1, line);
                  setPayment(currPayment);
                }}
                removeLine={() => {
                  const currPayment = { ...payment };
                  currPayment.lines?.splice(index, 1);
                  setPayment(currPayment);
                }}
              />
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs>
        <DateTimePicker
          value={payment?.paymentDate}
          label="Payment Date"
          onChange={(evt) => {
            setPayment({ ...payment, paymentDate: evt as Date });
          }}
          sx={{
            marginBottom: 1,
          }}
        />
        <TextField
          label="Remarks"
          fullWidth
          multiline
          name="remarks"
          value={payment?.remarks}
          onChange={onEventChange}
          rows={10}
        ></TextField>
        <Stack
          direction="row"
          sx={{ marginTop: 1, justifyContent: "flex-end" }}
        >
          <Button
            onClick={handleClearPayment}
            startIcon={<CancelIcon />}
            variant="contained"
            color="error"
            sx={{ marginRight: 1 }}
          >
            Cancel
          </Button>
          <Button
            startIcon={<TaskIcon />}
            variant="contained"
            color="success"
            onClick={() => {
              submitTransaction(payment);
              handleClearPayment();
            }}
          >
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CreateTransaction;
