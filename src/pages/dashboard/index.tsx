import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

const DashBoard = () => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <AppsIcon fontSize="large" />
            <Typography variant="h5"> Dashboard </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashBoard;
