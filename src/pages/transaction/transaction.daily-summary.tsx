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
import { DailySummaryPayload, DailySummaryResponse } from "../../types";

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

  const SummarizeValues = (value?: DailySummaryResponse, type?: string) => {
    const CasaPrimoDTRCashIn = value?.pendingPaymentCasaPrimoDTRCashIn ?? 0;
    const CasaPrimoDTRCashOut = value?.pendingPaymentCasaPrimoDTRCashOut ?? 0;
    const CasaPrimoPassbookCashIn =
      value?.pendingPaymentCasaPrimoPassbookCashIn ?? 0;
    const CasaPrimoPassbookCashOut =
      value?.pendingPaymentCasaPrimoPassbookCashOut ?? 0;
    const totalClientPayment = value?.totalClientPayment ?? 0;
    const initialCapitalInvestment = value?.initialCapitalInvestment ?? 0;
    const otherCashinPayments = value?.otherCashinPayments ?? 0;
    const agentsCommission = value?.agentsCommission ?? 0;
    const notarialFee = value?.notarialFee ?? 0;
    const processingFee = value?.processingFee ?? 0;
    const fixedExpense = value?.fixedExpense ?? 0;
    const controlledExpense = value?.controlledExpense ?? 0;
    const otherCashoutPayments = value?.otherCashoutPayments ?? 0;
    const previousExpenses = value?.previousExpenses ?? 0;
    const PettyCashIn = value?.pettyCashPettyCashIn ?? 0;
    const PNBSavings = 0;

    const CasaPrimoDTR = CasaPrimoDTRCashIn - CasaPrimoDTRCashOut;
    const CasaPrimoPassbook =
      CasaPrimoPassbookCashIn - CasaPrimoPassbookCashOut;
    const TotalCashIn = CasaPrimoDTRCashIn + CasaPrimoPassbookCashIn;
    const TotalCashOut = CasaPrimoDTRCashOut + CasaPrimoPassbookCashOut;
    const TotalBalance =
      CasaPrimoDTRCashIn +
      CasaPrimoPassbookCashIn +
      CasaPrimoDTRCashOut +
      CasaPrimoPassbookCashOut;
    const TotalGrossSales =
      totalClientPayment +
      initialCapitalInvestment +
      otherCashinPayments +
      CasaPrimoDTR +
      CasaPrimoPassbook;
    const TotalExpense =
      agentsCommission +
      notarialFee +
      processingFee +
      fixedExpense +
      controlledExpense +
      otherCashoutPayments;
    const AccumExpense = previousExpenses + TotalExpense;
    const TotalNetSales = TotalGrossSales - AccumExpense;
    const ChinaBankCheck = TotalNetSales - (PettyCashIn + PNBSavings);
    const ChinaBankLessPending = ChinaBankCheck - CasaPrimoPassbook;
    const TotalDailyNetSales = ChinaBankLessPending + CasaPrimoDTR;

    if (type === "CasaPrimoDTR") return CasaPrimoDTR;
    if (type === "CasaPrimoPassbook") return CasaPrimoPassbook;
    if (type === "TotalCashIn") return TotalCashIn;
    if (type === "TotalCashOut") return TotalCashOut;
    if (type === "TotalBalance") return TotalBalance;
    if (type === "TotalGrossSales") return TotalGrossSales;
    if (type === "TotalExpense") return TotalExpense;
    if (type === "AccumExpense") return AccumExpense;
    if (type === "TotalNetSales") return TotalNetSales;
    if (type === "ChinaBankCheck") return ChinaBankCheck;
    if (type === "ChinaBankLessPending") return ChinaBankLessPending;
    if (type === "TotalDailyNetSales") return TotalDailyNetSales;
  };

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
                      {SummarizeValues(summary, "CasaPrimoDTR")}
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
                      {SummarizeValues(summary, "CasaPrimoPassbook")}
                    </CellBalance>
                  </TableRow>
                  <TableRow>
                    <StyledCell sx={{ fontWeight: 600 }}>Total</StyledCell>
                    <CellCashIn align="right" sx={{ fontWeight: 600 }}>
                      {SummarizeValues(summary, "TotalCashIn")}
                    </CellCashIn>
                    <CellCashOut align="right" sx={{ fontWeight: 600 }}>
                      {SummarizeValues(summary, "TotalCashOut")}
                    </CellCashOut>
                    <CellBalance align="right" sx={{ fontWeight: 600 }}>
                      {SummarizeValues(summary, "TotalBalance")}
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
                value={SummarizeValues(summary, "TotalGrossSales")?.toString()}
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
                value={SummarizeValues(summary, "TotalExpense")?.toString()}
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Total Accumulated Expense"
                bold
                boldValue
                value={SummarizeValues(summary, "AccumExpense")?.toString()}
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Total Net Sales"
                bold
                boldValue
                value={SummarizeValues(summary, "TotalNetSales")?.toString()}
                alignment="center"
                marginBottom="20px"
              />
              <DailyValuesContainer
                label="Banking"
                backgroundColor=""
                value=""
                bold
                boldValue
                alignment="center"
              />
              <DailyValuesContainer
                label="Chinabank Checking"
                value={SummarizeValues(summary, "ChinaBankCheck")?.toString()}
                alignment="center"
              />
              <DailyValuesContainer
                label="Petty Cash In"
                value={`${summary?.pettyCashPettyCashIn ?? 0}`}
                alignment="center"
              />
              <DailyValuesContainer
                label="PNB Savings"
                value={``}
                alignment="center"
              />
              <DailyValuesContainer
                label="TOTAL NET SALES (Daily Transaction)"
                bold
                boldValue
                value={SummarizeValues(
                  summary,
                  "TotalDailyNetSales"
                )?.toString()}
                alignment="center"
              />
              <DailyValuesContainer
                label="Chinabank less Pending Passbook"
                bold
                boldValue
                value={SummarizeValues(
                  summary,
                  "ChinaBankLessPending"
                )?.toString()}
                alignment="center"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailySummary;
