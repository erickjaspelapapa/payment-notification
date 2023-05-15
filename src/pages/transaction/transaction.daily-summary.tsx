import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { addYears, format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "mui-image";
import styled from "@emotion/styled";

import { DAILY_SUMMARY } from "../../utils/const";
import service from "../../services/service";
import { DailySummaryPayload } from "../../types";

const StyledCell = styled(TableCell)`
  border: 1px solid gainsboro;
`;

const CellCashIn = styled(StyledCell)`
  background-color: #d9d9d9;
`;

const CellCashOut = styled(StyledCell)`
  background-color: #e2efda;
`;

const CellBalance = styled(StyledCell)`
  background-color: #f2f2f2;
`;
type DailyValuesContainerProps = {
  label: string;
  value?: string;
  marginBottom?: string;
  backgroundColor?: string;
  alignment?: string;
  bold?: boolean;
  boldValue?: boolean;
};

const DailyValuesContainer = ({
  label,
  value,
  backgroundColor = "#F2F2F2",
  marginBottom = "0",
  alignment = "end",
  bold = false,
  boldValue = false,
}: DailyValuesContainerProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: backgroundColor,
        width: "100%",
        marginBottom: { marginBottom },
      }}
    >
      <Typography
        sx={{ flex: 1, paddingLeft: 2, fontWeight: bold ? 600 : 100 }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          flex: 1,
          textAlign: alignment,
          fontWeight: boldValue ? 600 : 100,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

const DailySummary = () => {
  const [years, setYears] = useState<number>(3);
  const [payload, setPayload] = useState<DailySummaryPayload>({
    fromDate: new Date(),
    toDate: addYears(new Date(), years),
  });

  const { data: summary, refetch: getDailySummary } = useQuery({
    queryKey: [DAILY_SUMMARY, payload],
    queryFn: () => service.getDailySummary(payload),
  });

  useEffect(() => {
    getDailySummary();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ borderRight: "1px solid gainsboro" }}>
          <Typography gutterBottom variant="h4">
            {format(payload.fromDate, "MMM yyyy")}
          </Typography>
          <DatePicker
            value={new Date(payload.fromDate)}
            label="From Date"
            onChange={(evt) => {
              setPayload({
                fromDate: evt as Date,
                toDate: addYears(evt as Date, years),
              });
            }}
            sx={{
              marginBottom: 3,
            }}
          />
          <DatePicker
            value={payload.toDate}
            disabled
            label="To Date"
            // onChange={(evt) => {
            //   setPayload({ ...payload, fromDate: evt as Date });
            // }}
            sx={{
              marginBottom: 1,
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Box component={Paper} sx={{ width: 700 }}>
            <Stack
              alignItems={"center"}
              sx={{ backgroundColor: "#1E5631", padding: 2 }}
            >
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

                  width: "100%",
                  textAlign: "center",
                }}
              >
                CASA LUNA II CASHFLOW MONITORING SHEET
              </Typography>
            </Stack>
            <Box sx={{ width: "100% ", marginTop: 3 }}>
              <DailyValuesContainer
                label="Total Client Payments"
                value={`${summary?.totalClientPayment ?? 0}`}
                alignment="center"
              />
              <DailyValuesContainer
                label="Initial Capital & Investment"
                backgroundColor="#D9D9D9"
                value={`${summary?.initialCapitalInvestment ?? 0}`}
                alignment="center"
              />
              <DailyValuesContainer
                label="Other Cash-in Payments"
                value={`${summary?.otherCashinPayments ?? 0}`}
                alignment="center"
                marginBottom="20px"
              />
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledCell sx={{ fontWeight: 600 }}>
                      Pending Payment
                    </StyledCell>
                    <CellCashIn align="center" sx={{ fontWeight: 600 }}>
                      Cash In
                    </CellCashIn>
                    <CellCashOut align="center" sx={{ fontWeight: 600 }}>
                      Cash Out
                    </CellCashOut>
                    <CellBalance align="center" sx={{ fontWeight: 600 }}>
                      Balance
                    </CellBalance>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledCell component="th" scope="row">
                      Casa Luna Phase II (DTR)
                    </StyledCell>
                    <CellCashIn align="right">
                      {summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0}
                    </CellCashIn>
                    <CellCashOut align="right">
                      {summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0}
                    </CellCashOut>
                    <CellBalance align="right">
                      {(summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0) -
                        (summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0)}
                    </CellBalance>
                  </TableRow>
                  <TableRow>
                    <StyledCell component="th" scope="row">
                      Casa Luna Phase II (Passbook)
                    </StyledCell>
                    <CellCashIn align="right">
                      {summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0}
                    </CellCashIn>
                    <CellCashOut align="right">
                      {summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0}
                    </CellCashOut>
                    <CellBalance align="right">
                      {(summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0) -
                        (summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0)}
                    </CellBalance>
                  </TableRow>
                  <TableRow>
                    <StyledCell sx={{ fontWeight: 600 }}>Total</StyledCell>
                    <CellCashIn align="right" sx={{ fontWeight: 600 }}>
                      {(summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0) +
                        (summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0)}
                    </CellCashIn>
                    <CellCashOut align="right" sx={{ fontWeight: 600 }}>
                      {(summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0) +
                        (summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0)}
                    </CellCashOut>
                    <CellBalance align="right" sx={{ fontWeight: 600 }}>
                      {(summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0) +
                        (summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0) -
                        (summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0) +
                        (summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0)}
                    </CellBalance>
                  </TableRow>
                </TableBody>
              </Table>
              <DailyValuesContainer
                label=""
                value=""
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Total Gross Sales"
                value={`${
                  (summary?.totalClientPayment ?? 0) +
                  (summary?.initialCapitalInvestment ?? 0) +
                  (summary?.otherCashinPayments ?? 0) +
                  ((summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0) -
                    (summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0)) +
                  ((summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0) -
                    (summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0))
                }`}
                bold
                boldValue
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Previous Expense"
                value={`${summary?.previousExpenses ?? 0}`}
                bold
                boldValue
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Expenses"
                backgroundColor=""
                value=""
                bold
                boldValue
                alignment="center"
              />
              <DailyValuesContainer
                label="Agent's Commision"
                value={`${summary?.agentsCommission ?? 0}`}
                alignment="center"
              />{" "}
              <DailyValuesContainer
                label="Notarial Fee"
                value={`${summary?.notarialFee ?? 0}`}
                alignment="center"
              />{" "}
              <DailyValuesContainer
                label="Processing Fee"
                value={`${summary?.processingFee ?? 0}`}
                alignment="center"
              />{" "}
              <DailyValuesContainer
                label="Fixed Expense"
                value={`${summary?.fixedExpense ?? 0}`}
                alignment="center"
              />{" "}
              <DailyValuesContainer
                label="Controlled Expense"
                value={`${summary?.controlledExpense ?? 0}`}
                alignment="center"
              />{" "}
              <DailyValuesContainer
                label="Other Cash-out Payments"
                value={`${summary?.otherCashoutPayments ?? 0}`}
                alignment="center"
              />
              <DailyValuesContainer
                label="Total Expense"
                bold
                boldValue
                value={`${
                  (summary?.agentsCommission ?? 0) +
                  (summary?.notarialFee ?? 0) +
                  (summary?.processingFee ?? 0) +
                  (summary?.fixedExpense ?? 0) +
                  (summary?.controlledExpense ?? 0) +
                  (summary?.otherCashoutPayments ?? 0)
                }`}
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Total Accumulated Expense"
                bold
                boldValue
                value={`${
                  (summary?.previousExpenses ?? 0) +
                  (summary?.agentsCommission ?? 0) +
                  (summary?.notarialFee ?? 0) +
                  (summary?.processingFee ?? 0) +
                  (summary?.fixedExpense ?? 0) +
                  (summary?.controlledExpense ?? 0) +
                  (summary?.otherCashoutPayments ?? 0)
                }`}
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Total Net Sales"
                bold
                boldValue
                value={`${
                  (summary?.totalClientPayment ?? 0) +
                  (summary?.initialCapitalInvestment ?? 0) +
                  (summary?.otherCashinPayments ?? 0) +
                  ((summary?.pendingPaymentCasaPrimoDTRCashIn ?? 0) -
                    (summary?.pendingPaymentCasaPrimoDTRCashOut ?? 0)) +
                  ((summary?.pendingPaymentCasaPrimoPassbookCashIn ?? 0) -
                    (summary?.pendingPaymentCasaPrimoPassbookCashOut ?? 0)) -
                  ((summary?.previousExpenses ?? 0) +
                    (summary?.agentsCommission ?? 0) +
                    (summary?.notarialFee ?? 0) +
                    (summary?.processingFee ?? 0) +
                    (summary?.fixedExpense ?? 0) +
                    (summary?.controlledExpense ?? 0) +
                    (summary?.otherCashoutPayments ?? 0))
                }`}
                alignment="center"
                marginBottom="20px"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailySummary;
