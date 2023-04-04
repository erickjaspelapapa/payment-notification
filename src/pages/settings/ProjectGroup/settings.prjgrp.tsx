import { Box } from "@mui/material";
import TableView from "../../../components/TableView";
import { columns } from "./+columns";

const SettingPrjGrp = () => {
  return (
    <Box>
      <TableView columns={columns} data={[]} loading={false} />
    </Box>
  );
};

export default SettingPrjGrp;