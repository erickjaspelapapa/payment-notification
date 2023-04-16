import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { agents } from "../../../types";

type AgentDeleteProps = {
  agent: agents;
  state: boolean;
  closeDialog: () => void;
  deleteAgent: (agentId: number) => void;
};

const AgentDelete = ({
  agent,
  state,
  closeDialog,
  deleteAgent,
}: AgentDeleteProps) => {
  return (
    <Dialog open={state} onClose={closeDialog}>
      <DialogTitle>Delete Agent</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete Agent [${agent.agentFirstName} ${agent.agentLastName}] ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteAgent(agent.id)}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentDelete;
