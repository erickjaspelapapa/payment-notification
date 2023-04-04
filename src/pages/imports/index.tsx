import { Box, Grid } from "@mui/material";

import ImportList from "./imports-list";

const ImportClient = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <ImportList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImportClient;
