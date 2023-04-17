import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NumericInput, { HTMLNumericElement } from "material-ui-numeric-input";
import { DatePicker } from "@mui/x-date-pickers";

import { clients } from "../../types";

type ClientDialogProps = {
  client?: clients;
  setClient: (client: clients) => void;
  state: boolean;
  closeDialog: () => void;
  submit: (client?: clients) => void;
};
const ClientDialog = ({
  client,
  state,
  setClient,
  closeDialog,
  submit,
}: ClientDialogProps) => {
  const onEventChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (client) {
      setClient({
        ...client,
        [name]: value,
      });
    }
  };
  return (
    <Dialog fullWidth open={state} onClose={closeDialog} maxWidth="md">
      <DialogTitle>New Client</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h6">
              Client Information
            </Typography>
            <TextField
              fullWidth
              name="clientId"
              variant="outlined"
              label="Client Number"
              value={client?.clientId}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="clientName"
              variant="outlined"
              label="Client Name"
              value={client?.clientName}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="clientContactNumber"
              variant="outlined"
              label="Client Contact Number"
              value={client?.clientContactNumber}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="bldgBlock"
              variant="outlined"
              label="Building Block"
              value={client?.bldgBlock}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="bldgLot"
              variant="outlined"
              label="Building Lot"
              value={client?.bldgLot}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <Stack direction="row">
              <TextField
                fullWidth
                name="totalContractPrice"
                label="Total Contract Price"
                value={client?.totalContractPrice}
                inputProps={{ type: "number", pattern: "[0-9]*" }}
                onChange={onEventChange}
                variant="outlined"
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
              {/* <DatePicker
                name="dateStartMonthlyPay"
                label="Start of Monthly Payment"
                value=
                onChange={onEventChange}
              /> */}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"> Others </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={() => submit(client)} variant="contained" color="info">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientDialog;
