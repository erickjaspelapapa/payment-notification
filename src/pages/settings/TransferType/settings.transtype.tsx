import { Box, Button } from "@mui/material";
import { useQuery } from "react-query";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

import TableView from "../../../components/TableView";
import { SETTINGS_TRANSTYPE } from "../../../utils/const";
import service from "../../../services/service";
import { columns } from "./+columns";

const SettingTransType = () => {
  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_TRANSTYPE,
    queryFn: service.getTransferTypes,
  });

  React.useEffect(() => {
    getList;
  });

  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: 1 }}
      >
        Transfer Type
      </Button>
      <TableView columns={columns} data={data?.data} loading={false} />
    </Box>
  );
};

export default SettingTransType;
