import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { projectGroups } from "../../../types";

type ProjGrpDeleteProps = {
  prjGrp: projectGroups;
  state: boolean;
  closeDialog: () => void;
  deletePrjGrp: (prjGrpId: number) => void;
};

const ProjGroupDelete = ({
  prjGrp,
  state,
  closeDialog,
  deletePrjGrp,
}: ProjGrpDeleteProps) => {
  return (
    <Dialog open={state} onClose={closeDialog}>
      <DialogTitle>Delete Project Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete Project Group [${prjGrp.projGrpDescription}] ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deletePrjGrp(prjGrp.id)}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjGroupDelete;
