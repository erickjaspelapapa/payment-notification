import { FolderOff } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import grey from "@mui/material/colors/grey";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type TableViewProps = {
  columns: GridColDef[];
  data?: any;
  loading: boolean;
};

const NoRowsOverlay: React.FC = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    <FolderOff
      fontSize="large"
      sx={{ fontSize: "60px", color: grey[700], mb: 2 }}
    />
    <Typography>Ooops! there&lsquo;s no data found</Typography>
  </Stack>
);

const TableView = ({ columns, data, loading }: TableViewProps) => {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={data ?? []}
        columns={columns}
        loading={loading}
        autoPageSize
        pageSizeOptions={[20, 40, 60]}
        components={{ NoRowsOverlay }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
};

export default TableView;
