import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useQuery } from "react-query";
import React from "react";

import { columns } from "./+columns";
import TableView from "../../components/TableView";
import { CLIENT_LIST } from "../../utils/const";
import service from "../../services/service";

const ClientList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { data, refetch: getList } = useQuery({
    queryKey: CLIENT_LIST,
    queryFn: service.getClients,
  });

  React.useEffect(() => {
    getList;
  });

  const handleEditClient = (clientId: number) => {};
  const handleDeleteClient = (clientId: number) => {};

  return (
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
            <TableView
              columns={columns({
                onEdit: handleEditClient,
                onDelete: handleDeleteClient,
              })}
              data={data?.data}
              loading={loading}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ClientList;
