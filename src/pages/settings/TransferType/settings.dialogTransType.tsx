import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { transferTypes } from "../../../types";

type TransTypeDialogProps = {
  trans: transferTypes;
  setTransType: (trans: transferTypes) => void;
  isNew: boolean;
  state: boolean;
  closeDialog: () => void;
  submit: (trans: transferTypes) => void;
};
const TransferTypeDialog = ({
  trans,
  state,
  isNew,
  setTransType,
  closeDialog,
  submit,
}: TransTypeDialogProps) => {
  return (
    <Dialog fullWidth open={state} onClose={closeDialog}>
      <DialogTitle>{`${isNew ? "New" : "Update"} Transfer Type`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="transTypeName"
          label="Transfer Type Description"
          value={trans.transTypeDescription}
          onChange={(evt) =>
            setTransType({
              ...trans,
              transTypeDescription: evt.target.value,
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={() => submit(trans)} variant="contained" color="info">
          {isNew ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferTypeDialog;
