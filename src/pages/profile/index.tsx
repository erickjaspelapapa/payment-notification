import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Tab,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import ClientProfile from "./profile.main";
import { CLIENT_PROFILE, PAYMENT_LIST } from "../../utils/const";
import service from "../../services/service";
import CreateTransaction from "./profile.createTransaction";
import TableView from "../../components/TableView";
import { columns } from "./+columns";
import { paymentPayload } from "../../types";

const StyledTab = styled(Tab)(() => ({
  color: "#6a6a6a",
  "&.Mui-selected": {
    fontWeight: "bolder",
  },
}));

export const defaultPayment: paymentPayload = {
  id: 0,
  created_dt: new Date(),
  updated_dt: new Date(),
  transId: 0,
  lines: [],
  paymentDate: new Date(),
  remarks: "",
  clientId: 0,
  agentId: 0,
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const [payment, setPayment] = React.useState<paymentPayload>();
  const [isNew, setIsNew] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { data: client, refetch: getProfile } = useQuery({
    queryKey: [CLIENT_PROFILE, id],
    queryFn: () => service.getClientsById(id),
  });

  const { data: paymentList, refetch: getPaymentList } = useQuery({
    queryKey: [PAYMENT_LIST, id],
    queryFn: () => service.getTransactionList(id),
  });

  // const { data: transaction, refetch: getClientTransaction } = useQuery({
  //   queryKey: [PAYMENT_TRANSACTION, transId],
  //   queryFn: () => (transId != 0 ? service.getClientTransaction(transId) : {}),
  // });

  const { mutate: getClientTransaction, isLoading: transLoading } = useMutation(
    service.getClientTransaction,
    {
      onSuccess: (data) => {
        console.log(data.data);
        setPayment(data.data);
      },
      onError: (data) => {
        console.log(data);
      },
    }
  );

  React.useEffect(() => {
    getProfile();
    getPaymentList();
  }, []);

  const { mutate: AddTransaction, isLoading: addLoading } = useMutation(
    service.addTransaction,
    {
      onSuccess: (data) => {
        getPaymentList();
        toast.success("Transaction Successfully Created");
      },
      onError: (data) => {
        toast.error("Something Went Wrong!");
      },
    }
  );
  const { mutate: UpdateTransaction, isLoading: updateLoading } = useMutation(
    service.updateTransaction,
    {
      onSuccess: (data) => {
        getPaymentList();
        toast.success("Transaction Successfully Updated");
      },
      onError: (data) => {
        toast.error("Something Went Wrong!");
      },
    }
  );

  const handleEditTran = (id: number) => {
    setIsNew(false);
    getClientTransaction(id);
  };
  const handleDeleteTran = () => {};
  return (
    <Box>
      <Button
        onClick={() => navigate("/clients")}
        startIcon={<ArrowBackIcon />}
        variant="contained"
        color="secondary"
        sx={{ marginBottom: 1 }}
      >
        Back to Clients
      </Button>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <AccountCircleIcon fontSize="large" />
                <Typography variant="h5">
                  {`${client?.data.clientName}'s Profile`}{" "}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={3} sx={{ borderRight: "1px solid gainsboro" }}>
              <Divider flexItem />
              <ClientProfile client={client?.data} />
            </Grid>

            <Grid item xs={9}>
              <Divider flexItem />
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <StyledTab label="Transactions" value="1" />
                    <StyledTab label="Client Summary" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  {!payment && (
                    <Box>
                      <Button
                        onClick={() => {
                          setIsNew(true);
                          setPayment({
                            ...defaultPayment,
                            clientId: client?.data.id,
                            agentId: client?.data.agentId,
                          });
                        }}
                        color="secondary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ marginBottom: 1 }}
                      >
                        Transaction
                      </Button>
                      <TableView
                        data={paymentList?.data}
                        columns={columns({
                          onEdit: handleEditTran,
                          onDelete: handleDeleteTran,
                        })}
                        loading={false}
                      />
                    </Box>
                  )}
                  {!!payment && (
                    <CreateTransaction
                      isNew={isNew}
                      payment={payment}
                      setPayment={(pay) => {
                        if (pay) {
                          setPayment(pay);
                        } else {
                          defaultPayment.lines = [];
                          setPayment(undefined);
                        }
                      }}
                      submitTransaction={(payment) => {
                        if (isNew) {
                          AddTransaction(payment);
                        } else {
                          UpdateTransaction(payment);
                        }
                      }}
                    />
                  )}
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ paddingTop: 2, paddingBottom: 2 }}
                ></TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
