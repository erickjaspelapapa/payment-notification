import { Box, Stack, Tab, Typography, styled } from "@mui/material";
import { format } from "date-fns";
import React from "react";

import { clients } from "../../types";

type ValueWithLabel = {
  label: string;
  value?: string | number;
};

const ValueWithLabel = ({ label, value }: ValueWithLabel) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row">
        <Typography sx={{ fontSize: 14, flex: 1 }}>{label}</Typography>
        <Typography
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: 14, flex: 1 }}
        >
          {value}
        </Typography>
      </Stack>
    </Box>
  );
};

type ClientProfileProps = { client?: clients };

const ClientProfile = ({ client }: ClientProfileProps) => {
  return (
    <Box>
      <Typography
        gutterBottom
        sx={{ fontSize: 16, paddingTop: 2, fontWeight: 600 }}
      >
        Client Information
      </Typography>
      <Box sx={{ paddingLeft: 1, marginBottom: 2 }}>
        <ValueWithLabel label="Id" value={client?.clientId} />
        <ValueWithLabel label="Name" value={client?.clientName} />
        <ValueWithLabel
          label="Contact Number"
          value={client?.clientContactNumber}
        />
        <ValueWithLabel label="Block" value={client?.bldgBlock} />
        <ValueWithLabel label="Lot" value={client?.bldgLot} />
        <ValueWithLabel
          label="Contract Price"
          value={client?.totalContractPrice}
        />
        <ValueWithLabel label="Months To Pay" value={client?.monthsToPay} />
        <ValueWithLabel label="Transfer Fee" value={client?.transferFee} />
        <ValueWithLabel
          label="First Monthly Pay"
          value={format(
            new Date(client?.dateStartMonthlyPay ?? new Date()),
            "MMMM dd, yyyy"
          )}
        />
      </Box>
      <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 600 }}>
        Other Information
      </Typography>
      <Box sx={{ paddingLeft: 2 }}>
        <ValueWithLabel
          label="Agent"
          value={`${client?.agent?.agentFirstName} ${client?.agent?.agentLastName}`}
        />
        <ValueWithLabel
          label="Project Group"
          value={client?.projGroup?.projGrpDescription}
        />
        <ValueWithLabel
          label="Transfer Type"
          value={client?.transType?.transTypeDescription}
        />
      </Box>
    </Box>
  );
};

export default ClientProfile;
