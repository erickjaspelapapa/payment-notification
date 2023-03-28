import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const ImportClient = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <GroupAddIcon fontSize="large" />
            <Typography variant="h5"> Import Clients </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImportClient;
