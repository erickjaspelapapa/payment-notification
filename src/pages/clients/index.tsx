import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import React from "react";

import { columns } from "./+columns";
import TableView from "../../components/TableView";
``;

const ClientList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <GroupIcon fontSize="large" />
                <Typography variant="h5"> Clients </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TableView columns={columns} data={[]} loading={loading} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientList;
