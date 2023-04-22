import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

import { columns } from "./+columns";
import TableView from "../../components/TableView";
import { CLIENT_LIST } from "../../utils/const";
import service from "../../services/service";
import ClientDialog from "./clients.dialog";
import { clients } from "../../types";
import { toast } from "react-toastify";

const defaultClient: clients = {
  clientId: "",
  clientName: "",
  clientContactNumber: "",
  bldgBlock: "",
  bldgLot: "",
  totalContractPrice: 0,
  dateStartMonthlyPay: new Date(),
  transferFee: 0,
  transTypeId: 0,
  agentId: 0,
  projGrpId: 0,
  id: 0,
  created_dt: new Date(),
  updated_dt: new Date(),
  monthsToPay: 0,
};

const ClientList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [client, setClient] = React.useState<clients>(defaultClient);
  const [clientDialog, setClientDialog] = React.useState<boolean>(false);

  const { data, refetch: getList } = useQuery({
    queryKey: CLIENT_LIST,
    queryFn: service.getClients,
  });

  const { mutate: InsertClient, isLoading: insertLoading } = useMutation(
    service.addClient,
    {
      onSuccess: (data) => {
        getList();
        toast.success("Client Added Successfully!");
      },
      onError: (data) => {
        toast.success("Something went wrong!");
      },
    }
  );

  React.useEffect(() => {
    getList;
  });

  const handleOpenClientDialog = () => {
    setClientDialog(true);
  };

  const handleCloseClientDialog = () => {
    setClient(defaultClient);
    setClientDialog(false);
  };

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
            <Button
              onClick={handleOpenClientDialog}
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginBottom: 1 }}
            >
              Clients
            </Button>
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

        <ClientDialog
          client={client}
          setClient={(client) => setClient(client)}
          state={clientDialog}
          closeDialog={handleCloseClientDialog}
          submit={(client) => {
            InsertClient(client);
            handleCloseClientDialog();
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ClientList;
