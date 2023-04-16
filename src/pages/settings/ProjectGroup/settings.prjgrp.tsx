import { Box, Button } from "@mui/material";
import { useQuery } from "react-query";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

import { columns } from "./+columns";
import TableView from "../../../components/TableView";
import service from "../../../services/service";
import { SETTINGS_PRJGRP } from "../../../utils/const";

const SettingPrjGrp = () => {
  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_PRJGRP,
    queryFn: service.getProjectGroups,
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
        Project Group
      </Button>
      <TableView columns={columns} data={data?.data} loading={false} />
    </Box>
  );
};

export default SettingPrjGrp;
