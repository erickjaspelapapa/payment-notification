import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { agents } from "../../../types";

type AgentDialogProps = {
  agent: agents;
  setAgent: (agent: agents) => void;
  isNew: boolean;
  state: boolean;
  closeDialog: () => void;
  submit: (agent: agents) => void;
};
const AgentDialog = ({
  agent,
  state,
  isNew,
  setAgent,
  closeDialog,
  submit,
}: AgentDialogProps) => {
  return (
    <Dialog fullWidth open={state} onClose={closeDialog}>
      <DialogTitle>{`${isNew ? "New" : "Update"} Agent`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          value={agent.agentFirstName}
          onChange={(evt) =>
            setAgent({
              ...agent,
              agentFirstName: evt.target.value,
            })
          }
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Last Name"
          value={agent.agentLastName}
          onChange={(evt) =>
            setAgent({
              ...agent,
              agentLastName: evt.target.value,
            })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={() => submit(agent)} variant="contained" color="info">
          {isNew ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentDialog;
