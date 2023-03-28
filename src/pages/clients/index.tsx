import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

const ClientList = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <GroupIcon fontSize="large" />
            <Typography variant="h5"> Clients </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClientList;
