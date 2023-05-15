import { styled, Box, Tab, Divider } from "@mui/material";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";

import TransactionList from "./transaction.list";
import DailySummary from "./transaction.daily-summary";

const StyledTab = styled(Tab)(() => ({
  color: "#6a6a6a",
  "&.Mui-selected": {
    fontWeight: "bolder",
  },
}));

const Transactions = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <RequestQuoteIcon fontSize="large" />
                <Typography variant="h5"> Company Transaction </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <StyledTab label="Transaction" value="1" />
                    <StyledTab label="Daily Summary" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <TransactionList />
                </TabPanel>
                <TabPanel value="2" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <DailySummary />
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Transactions;
