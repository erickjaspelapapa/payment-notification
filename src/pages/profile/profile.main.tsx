import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Tab,
  Typography,
  styled,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { format } from "date-fns";
import React from "react";
import { TabContext } from "@mui/lab";

import { clients } from "../../types";

type ValueWithLabel = {
  label: string;
  value?: string | number;
};

const ValueWithLabel = ({ label, value }: ValueWithLabel) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontSize: 14 }}>{label}</Typography>
      <Typography sx={{ fontWeight: "bold", paddingLeft: 2, fontSize: 14 }}>
        {value}
      </Typography>
    </Box>
  );
};

const StyledTab = styled(Tab)(() => ({
  color: "#6a6a6a",
  "&.Mui-selected": {
    fontWeight: "bolder",
  },
}));

type ClientProfileProps = { client?: clients };

const ClientProfile = ({ client }: ClientProfileProps) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountCircleIcon fontSize="large" />
              <Typography variant="h5">
                {`${client?.clientName}'s Profile`}{" "}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Divider flexItem />
            <Typography sx={{ fontSize: 16 }}>Client Information</Typography>
            <Box sx={{ paddingLeft: 2, marginBottom: 2 }}>
              <ValueWithLabel label="Id" value={client?.clientId} />
              <ValueWithLabel label="Name" value={client?.clientName} />
              <ValueWithLabel
                label="Contact Number"
                value={client?.clientContactNumber}
              />
              <ValueWithLabel label="Block" value={client?.bldgBlock} />
              <ValueWithLabel label="Lot" value={client?.bldgLot} />
              <ValueWithLabel
                label="Contract Price"
                value={client?.totalContractPrice}
              />
              <ValueWithLabel label="Months To Pay" value={24} />
              <ValueWithLabel
                label="Transfer Fee"
                value={client?.transferFee}
              />
              <ValueWithLabel
                label="First Monthly Pay"
                value={format(
                  new Date(client?.dateStartMonthlyPay ?? new Date()),
                  "MMMM dd, yyyy"
                )}
              />
            </Box>
            <Typography sx={{ fontSize: 16 }}>Other Information</Typography>
            <Box sx={{ paddingLeft: 2 }}>
              <ValueWithLabel
                label="Agent"
                value={`${client?.agent?.agentFirstName} ${client?.agent?.agentLastName}`}
              />
              <ValueWithLabel
                label="Project Group"
                value={client?.projGroup?.projGrpDescription}
              />
              <ValueWithLabel
                label="Transfer Type"
                value={client?.transType?.transTypeDescription}
              />
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Divider flexItem />
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <StyledTab label="Payment Summary" value="1" />
                  <StyledTab label="Client Summary" value="2" />
                </TabList>
              </Box>
              <TabPanel
                value="1"
                sx={{ paddingTop: 2, paddingBottom: 2 }}
              ></TabPanel>
              <TabPanel
                value="2"
                sx={{ paddingTop: 2, paddingBottom: 2 }}
              ></TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ClientProfile;
