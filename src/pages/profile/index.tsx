import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import ClientProfile from "./profile.main";
import { CLIENT_PROFILE } from "../../utils/const";
import service from "../../services/service";
import React from "react";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: client, refetch: getProfile } = useQuery({
    queryKey: [CLIENT_PROFILE, id],
    queryFn: () => service.getClientsById(id),
  });

  React.useEffect(() => {
    getProfile;
  });

  return (
    <Box>
      <Button
        onClick={() => navigate("/clients")}
        startIcon={<ArrowBackIcon />}
        variant="contained"
        color="secondary"
        sx={{ marginBottom: 1 }}
      >
        Back to Clients
      </Button>

      <ClientProfile client={client?.data} />
    </Box>
  );
};

export default Profile;
