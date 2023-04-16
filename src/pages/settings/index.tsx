import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import SettingAgent from "./Agents/settings.agent";
import SettingPrjGrp from "./ProjectGroup/settings.prjgrp";
import SettingTransType from "./TransferType/settings.transtype";

const StyledTab = styled(Tab)(() => ({
  color: "#6a6a6a",
  "&.Mui-selected": {
    fontWeight: "bolder",
  },
}));

const Settings = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ paddingBottom: 1 }}
          >
            <SettingsIcon fontSize="large" />
            <Typography variant="h5"> Settings </Typography>
          </Stack>
          <Divider />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <StyledTab label="Agents" value="1" />
                <StyledTab label="Project Groups" value="2" />
                <StyledTab label="Transfer Types" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ paddingTop: 2, paddingBottom: 2 }}>
              <SettingAgent />
            </TabPanel>
            <TabPanel value="2" sx={{ paddingTop: 2, paddingBottom: 2 }}>
              <SettingPrjGrp />
            </TabPanel>
            <TabPanel value="3" sx={{ paddingTop: 2, paddingBottom: 2 }}>
              <SettingTransType />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
