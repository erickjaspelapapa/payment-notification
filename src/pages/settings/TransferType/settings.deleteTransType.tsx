import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { transferTypes } from "../../../types";

type TransTypeDeleteProps = {
  trans: transferTypes;
  state: boolean;
  closeDialog: () => void;
  deleteTransType: (transId: number) => void;
};

const TransferTypeDelete = ({
  trans,
  state,
  closeDialog,
  deleteTransType,
}: TransTypeDeleteProps) => {
  return (
    <Dialog open={state} onClose={closeDialog}>
      <DialogTitle>Delete Transfer Type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete Transfer Type [${trans.transTypeDescription}] ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteTransType(trans.id)}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferTypeDelete;
