import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Transaction } from "../../types";
import { format } from "date-fns";

type TransactionDeleteProps = {
  transaction: Transaction;
  state: boolean;
  closeDialog: () => void;
  deleteTransaction: (transId: number) => void;
};

const TransactionDelete = ({
  transaction,
  state,
  closeDialog,
  deleteTransaction,
}: TransactionDeleteProps) => {
  return (
    <Dialog open={state} onClose={closeDialog}>
      <DialogTitle>Delete Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete Transaction [${
            transaction.category?.catDescription ?? "-"
          } ${
            transaction.identification?.idenDescription ?? "-"
          }] dated ${format(
            new Date(transaction.transDate),
            "MMMM dd,yyyy"
          )} ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteTransaction(transaction.id)}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDelete;
