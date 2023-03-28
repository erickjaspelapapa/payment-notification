import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <SettingsIcon fontSize="large" />
            <Typography variant="h5"> User Settings </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
