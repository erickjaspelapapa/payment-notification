import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { ChangeEvent } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import TableView from "../../components/TableView";
import { columns } from "./+columns";

const ImportList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <GroupAddIcon fontSize="large" />
              <Typography variant="h5"> Import Clients </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ marginRight: "1rem" }}
            >
              Upload CSV
              <input type="file" accept=".csv" hidden />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableView columns={columns} data={[]} loading={loading} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button color="warning" variant="contained" sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button color="secondary" variant="contained">
              Import
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ImportList;
