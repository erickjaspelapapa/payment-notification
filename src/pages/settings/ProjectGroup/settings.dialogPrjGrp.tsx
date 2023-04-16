import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { projectGroups } from "../../../types";

type ProjGrpDialogProps = {
  prjGrp: projectGroups;
  setProjGrp: (prjGrp: projectGroups) => void;
  isNew: boolean;
  state: boolean;
  closeDialog: () => void;
  submit: (prjGrp: projectGroups) => void;
};
const ProjGroupDialog = ({
  prjGrp,
  state,
  isNew,
  setProjGrp,
  closeDialog,
  submit,
}: ProjGrpDialogProps) => {
  return (
    <Dialog fullWidth open={state} onClose={closeDialog}>
      <DialogTitle>{`${isNew ? "New" : "Update"} Project Group`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="prjGrpName"
          label="Project Group Description"
          value={prjGrp.projGrpDescription}
          onChange={(evt) =>
            setProjGrp({
              ...prjGrp,
              projGrpDescription: evt.target.value,
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={() => submit(prjGrp)} variant="contained" color="info">
          {isNew ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjGroupDialog;
