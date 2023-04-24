import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useMutation, useQuery } from "react-query";

import TableView from "../../components/TableView";
import { columns } from "./+columns";
import { PAYMENT_RECORDS } from "../../utils/const";
import service from "../../services/service";
import React from "react";
import { paymentRecords, projectedPayment } from "../../types";
import { format } from "date-fns";

const PaymentRecords = () => {
  const [projected, setProjected] = React.useState<projectedPayment[]>();

  const { data: records, refetch: getList } = useQuery({
    queryKey: PAYMENT_RECORDS,
    queryFn: service.getPaymentRecords,
  });

  const { mutate: getProjected, isLoading: projLoading } = useMutation(
    service.getProjectedPayments,
    {
      onSuccess: (data) => {
        setProjected(data.data);
      },
      onError: (data) => {},
    }
  );
  React.useEffect(() => {
    getList;
  });

  const handleShowProjected = (id: string) => {
    getProjected(id);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <FolderSharedIcon fontSize="large" />
                <Typography variant="h5"> Payment Records </Typography>
              </Stack>
            </Grid>
            <Grid item xs={projected ? 9 : 12}>
              <TableView
                data={records?.data}
                columns={columns({ onShowProject: handleShowProjected })}
                loading={false}
              />
            </Grid>
            <Grid item xs>
              {!!projected && (
                <Box>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ maxWidth: 350, margin: 1 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Year</TableCell>
                          <TableCell>Month</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {projected.map((pay) => (
                          <TableRow
                            key={pay.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {pay.yearPay}
                            </TableCell>
                            <TableCell>
                              {format(parseInt(pay.monthPay), "MMM")}
                            </TableCell>
                            <TableCell align="right" scope="row">
                              {pay.amount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    color="error"
                    fullWidth
                    variant="contained"
                    onClick={() => setProjected(undefined)}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentRecords;
