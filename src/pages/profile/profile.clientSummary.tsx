import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Image } from "mui-image";

import { clients, paymentRecords } from "../../types";
import { addMonths, format } from "date-fns";

type SummaryValuesContainerProps = {
  label: string;
  value?: string;
  marginBottom?: string;
};

const SummaryValuesContainer = ({
  label,
  value,
  marginBottom = "0",
}: SummaryValuesContainerProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "#F2F2F2",
        width: "100%",
        marginBottom: { marginBottom },
      }}
    >
      <Typography sx={{ flex: 1, fontWeight: 600 }}>{label}</Typography>
      <Typography sx={{ flex: 1, textAlign: "end" }}>{value}</Typography>
    </Stack>
  );
};

type ClientSummaryProps = {
  summary?: paymentRecords;
  profile?: clients;
};

const ClientSummary = ({ profile, summary }: ClientSummaryProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Stack alignItems="center">
              <Image
                src={"../banner.png"}
                width={500}
                style={{ marginBottom: 5 }}
              />
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "white",
                  backgroundColor: "#1E5631",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                CLIENT SUMMARY SHEET
              </Typography>
              <Box sx={{ width: "100% ", marginTop: 3 }}>
                <SummaryValuesContainer
                  label="CLIENT NO."
                  value={summary?.clientId}
                />
                <SummaryValuesContainer
                  label="CLIENT NAME"
                  value={summary?.client}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="BLK"
                  value={profile?.bldgBlock}
                />{" "}
                <SummaryValuesContainer label="LOT" value={profile?.bldgLot} />
                <SummaryValuesContainer
                  label="Contact No."
                  value={profile?.clientContactNumber}
                  marginBottom="20px"
                />{" "}
                <SummaryValuesContainer
                  label="Monthly Payment Amount"
                  value={`${summary?.monthlyPayment}`}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="Latest Payment"
                  value={`${format(
                    new Date(summary?.latestPayment as Date),
                    "MMMM dd,yyyy"
                  )}`}
                />
                <SummaryValuesContainer
                  label="Date of First Payment"
                  value={`${format(
                    new Date(profile?.dateStartMonthlyPay as Date),
                    "MMMM dd,yyyy"
                  )}`}
                />
                <SummaryValuesContainer
                  label="Start of Monthly Payment"
                  value={`${format(
                    new Date(summary?.firstMonthlyPay as Date),
                    "MMMM dd,yyyy"
                  )}`}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="No. of Months to Pay"
                  value={`${summary?.monthsToPay}`}
                />
                <SummaryValuesContainer
                  label="No. of Months Left"
                  value={`${summary?.monthsPayLeft}`}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="Est. Month of Completion"
                  value={`${format(
                    addMonths(
                      new Date(profile?.dateStartMonthlyPay as Date),
                      summary?.monthsToPay as number
                    ),
                    "MMMM dd,yyyy"
                  )}`}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="Total Price"
                  value={`${summary?.totalContractPrice}`}
                />
                <SummaryValuesContainer
                  label="Downpayment"
                  value={`${summary?.downpaymentPerc}%`}
                />
                <SummaryValuesContainer
                  label="Downpayment + Reservation"
                  value={`${
                    (summary?.downpayment as number) +
                    (summary?.reservation as number)
                  }`}
                />
                <SummaryValuesContainer
                  label="Agent's Name"
                  value={`${summary?.agent}`}
                />
                <SummaryValuesContainer
                  label="Agent's Commission"
                  value={`${summary?.agentCommission}`}
                />
                <SummaryValuesContainer
                  label="Notarial Fee"
                  value={`${summary?.notarialFee}`}
                />
                <SummaryValuesContainer
                  label="Reservation"
                  value={`${summary?.reservation}`}
                />
                <SummaryValuesContainer
                  label="Promo"
                  value={`${summary?.promo}`}
                />
                <SummaryValuesContainer
                  label="Total Monthly Paid"
                  value={`${summary?.monthlyPayment}`}
                />
                <SummaryValuesContainer
                  label="Total Paid"
                  value={`${summary?.totalPaid}`}
                  marginBottom="20px"
                />
                <SummaryValuesContainer
                  label="Total Balance"
                  value={`${summary?.totalBalance}`}
                />
                <SummaryValuesContainer
                  label="Paid Transfer Fee"
                  value={`${summary?.transferFeePaid}`}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ClientSummary;
