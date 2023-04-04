import { Box } from "@mui/material";
import TableView from "../../../components/TableView";
import { columns } from "./+columns";

const SettingTransType = () => {
  return (
    <Box>
      <TableView columns={columns} data={[]} loading={false} />
    </Box>
  );
};

export default SettingTransType;
