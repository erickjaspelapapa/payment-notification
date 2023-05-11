import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { Category, Identification, Transaction } from "../../types";
import { DatePicker } from "@mui/x-date-pickers";

type TransactionDialogProps = {
  categories?: Category[];
  identification: Identification[];
  transaction: Transaction;
  setTransaction: (transaction?: Transaction) => void;
  isNew: boolean;
  state: boolean;
  closeDialog: () => void;
  submit: (transaction: Transaction) => void;
};

const TransactionDialog = ({
  categories,
  identification,
  transaction,
  state,
  isNew,
  setTransaction,
  closeDialog,
  submit,
}: TransactionDialogProps) => {
  return (
    <Dialog fullWidth open={state} onClose={closeDialog}>
      <DialogTitle>{`${isNew ? "New" : "Update"} Transaction`}</DialogTitle>
      <DialogContent>
        <Stack direction="row">
          <DatePicker
            value={new Date(transaction.transDate)}
            label="Date"
            sx={{ marginBottom: 1, marginTop: 1, marginRight: 1, flex: 1 }}
            onChange={(evt) => {
              setTransaction({
                ...transaction,
                transDate: evt as Date,
              });
            }}
          />
          <TextField
            label="Transaction"
            value={transaction.amount}
            inputProps={{ type: "number", pattern: "[0-9]*" }}
            onChange={(evt) =>
              setTransaction({
                ...transaction,
                amount: parseFloat(evt.target.value),
              })
            }
            variant="outlined"
            sx={{ marginBottom: 1, marginTop: 1, flex: 1 }}
          />
        </Stack>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={transaction.catId}
            label="Category"
            onChange={(evt) => {
              const catId = evt.target.value as number;
              setTransaction({
                ...transaction,
                catId: catId,
              });
            }}
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            {categories?.map((cat, index) => {
              return (
                <MenuItem key={index} value={cat.id}>
                  {cat.catDescription}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Identification</InputLabel>
          <Select
            name="Identification"
            value={transaction.identId}
            label="Identification"
            onChange={(evt) => {
              const identId = evt.target.value as number;
              setTransaction({
                ...transaction,
                identId: identId,
              });
            }}
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            {identification
              ?.filter((f) => f.catId === transaction.catId)
              .map((ind, index) => {
                return (
                  <MenuItem key={index} value={ind.id}>
                    {ind.idenDescription}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          fullWidth
          multiline
          name="description"
          value={transaction?.transDescription}
          onChange={(evt) => {
            setTransaction({
              ...transaction,
              transDescription: evt.target.value,
            });
          }}
          rows={5}
          margin="normal"
        />
        <TextField
          label="Remarks"
          fullWidth
          multiline
          name="remarks"
          value={transaction?.remarks}
          onChange={(evt) => {
            setTransaction({ ...transaction, remarks: evt.target.value });
          }}
          rows={5}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => submit(transaction)}
          variant="contained"
          color="info"
        >
          {isNew ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
