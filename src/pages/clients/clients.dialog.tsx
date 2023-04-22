import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { DatePicker } from "@mui/x-date-pickers";

import { clients } from "../../types";
import {
  SETTINGS_AGENT,
  SETTINGS_PRJGRP,
  SETTINGS_TRANSTYPE,
} from "../../utils/const";
import service from "../../services/service";

type ClientDialogProps = {
  client: clients;
  setClient: (client: clients) => void;
  state: boolean;
  closeDialog: () => void;
  submit: (client: clients) => void;
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
    setClient({
      ...client,
      [name]: value,
    });
  };

  const { data: agents, refetch: getAgentList } = useQuery({
    queryKey: SETTINGS_AGENT,
    queryFn: service.getAgents,
  });

  const { data: prjGroups, refetch: getProjectList } = useQuery({
    queryKey: SETTINGS_PRJGRP,
    queryFn: service.getProjectGroups,
  });

  const { data: transTypes, refetch: getTransTypeList } = useQuery({
    queryKey: SETTINGS_TRANSTYPE,
    queryFn: service.getTransferTypes,
  });

  React.useEffect(() => {
    getAgentList();
    getProjectList();
    getTransTypeList();
  }, []);

  return (
    <Dialog fullWidth open={state} onClose={closeDialog} maxWidth="md">
      <DialogTitle>New Client</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs sx={{ marginRight: 1 }}>
            <Typography gutterBottom variant="h6">
              Client Information
            </Typography>
            <TextField
              fullWidth
              name="clientId"
              variant="outlined"
              label="Client Number"
              value={client.clientId}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="clientName"
              variant="outlined"
              label="Client Name"
              value={client.clientName}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <TextField
              fullWidth
              name="clientContactNumber"
              variant="outlined"
              label="Client Contact Number"
              value={client.clientContactNumber}
              onChange={onEventChange}
              sx={{ marginBottom: 1, marginTop: 1 }}
            />
            <Stack direction="row">
              <TextField
                name="bldgBlock"
                variant="outlined"
                label="Building Block"
                value={client.bldgBlock}
                onChange={onEventChange}
                sx={{ marginBottom: 1, marginTop: 1, marginRight: 1 }}
              />
              <TextField
                name="bldgLot"
                variant="outlined"
                label="Building Lot"
                value={client.bldgLot}
                onChange={onEventChange}
                sx={{ marginBottom: 1, marginTop: 1 }}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                fullWidth
                name="totalContractPrice"
                label="Total Contract Price"
                value={client.totalContractPrice}
                inputProps={{ type: "number", pattern: "[0-9]*" }}
                onChange={onEventChange}
                variant="outlined"
                sx={{ marginBottom: 1, marginTop: 1, marginRight: 1 }}
              />
              <FormControl fullWidth>
                <InputLabel>Months To Pay</InputLabel>
                <Select
                  name="monthsToPay"
                  value={client.monthsToPay}
                  label="Age"
                  onChange={(evt) => {
                    setClient({
                      ...client,
                      monthsToPay: evt.target.value as number,
                    });
                  }}
                  sx={{ marginBottom: 1, marginTop: 1 }}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={36}>36</MenuItem>
                  <MenuItem value={48}>48</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row">
              <TextField
                name="transferFee"
                label="Transfer Fee"
                value={client.transferFee}
                inputProps={{ type: "number", pattern: "[0-9]*" }}
                onChange={onEventChange}
                variant="outlined"
                sx={{ marginBottom: 1, marginTop: 1, marginRight: 1 }}
              />
              <DatePicker
                value={client.dateStartMonthlyPay}
                label="First Monthly Pay"
                sx={{ marginBottom: 1, marginTop: 1 }}
                onChange={(evt) => {
                  setClient({
                    ...client,
                    dateStartMonthlyPay: evt as Date,
                  });
                }}
              />
            </Stack>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              Other Information
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Agents</InputLabel>
              <Select
                name="agentId"
                id="demo-simple-select"
                value={client.agentId}
                label="Age"
                onChange={(evt) => {
                  setClient({
                    ...client,
                    agentId: evt.target.value as number,
                  });
                }}
                sx={{ marginBottom: 1, marginTop: 1 }}
              >
                {agents?.data.map((agent) => (
                  <MenuItem
                    key={agent.id}
                    value={agent.id}
                  >{`${agent.agentFirstName} ${agent.agentLastName}`}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Project Group</InputLabel>
              <Select
                name="projGrpId"
                id="demo-simple-select"
                value={client.projGrpId}
                label="Age"
                onChange={(evt) => {
                  setClient({
                    ...client,
                    projGrpId: evt.target.value as number,
                  });
                }}
                sx={{ marginBottom: 1, marginTop: 1 }}
              >
                {prjGroups?.data.map((prj) => (
                  <MenuItem
                    key={prj.id}
                    value={prj.id}
                  >{`${prj.projGrpDescription}`}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Transfer Types</InputLabel>
              <Select
                name="transTypeId"
                id="demo-simple-select"
                value={client.transTypeId}
                label="Age"
                onChange={(evt) => {
                  setClient({
                    ...client,
                    transTypeId: evt.target.value as number,
                  });
                }}
                sx={{ marginBottom: 1, marginTop: 1 }}
              >
                {transTypes?.data.map((trans) => (
                  <MenuItem
                    key={trans.id}
                    value={trans.id}
                  >{`${trans.transTypeDescription}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
