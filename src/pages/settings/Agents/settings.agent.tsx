import { Box, Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TableView from "../../../components/TableView";
import { columns } from "./+columns";
import service from "../../../services/service";
import { SETTINGS_AGENT } from "../../../utils/const";
import { agents } from "../../../types";
import AgentDialog from "./settings.dialogAgent";
import AgentDelete from "./settings.deleteAgent";

const defaultAgent: agents = {
  id: 0,
  agentFirstName: "",
  agentLastName: "",
  created_dt: new Date(),
  updated_dt: new Date(),
};

const SettingAgent = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean>(true);
  const [agent, setAgent] = React.useState<agents>(defaultAgent);
  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_AGENT,
    queryFn: service.getAgents,
  });

  React.useEffect(() => {
    getList();
  }, []);

  const handleOpenDialog = () => {
    setIsNew(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsNew(true);
    setAgent(defaultAgent);
    setOpenDialog(false);
  };

  const handlCloseDelete = () => {
    setAgent(defaultAgent);
    setDeleteDialog(false);
  };

  const { mutate: InsertAgent, isLoading: insertLoading } = useMutation(
    service.addAgents,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Agent Added Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: UpdateAgent, isLoading: updateLoading } = useMutation(
    service.updateAgents,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Agent Updated Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: DeleteAgent, isLoading: deleteLoading } = useMutation(
    service.deleteAgents,
    {
      onSuccess: (data) => {
        getList();
        toast.error(`Agent Deleted Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const handleSubmit = (agent: agents, isNew: boolean) => {
    if (isNew) {
      InsertAgent(agent);
    } else {
      UpdateAgent(agent);
    }

    handleCloseDialog();
  };

  const handleDialogEdit = (agent: agents) => {
    setAgent(agent);
    setIsNew(false);
    setOpenDialog(true);
  };

  const handleDialogDelete = (agent: agents) => {
    setAgent(agent);
    setDeleteDialog(true);
  };

  return (
    <Box>
      <Button
        onClick={handleOpenDialog}
        color="secondary"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: 1 }}
      >
        Agent
      </Button>
      <TableView
        columns={columns({
          onEdit: handleDialogEdit,
          onDelete: handleDialogDelete,
        })}
        data={data?.data}
        loading={false}
      />
      <AgentDialog
        agent={agent}
        setAgent={(agent) => {
          setAgent(agent);
        }}
        state={openDialog}
        isNew={isNew}
        closeDialog={handleCloseDialog}
        submit={(agent) => {
          handleSubmit(agent, isNew);
        }}
      />
      <AgentDelete
        agent={agent}
        state={deleteDialog}
        closeDialog={handlCloseDelete}
        deleteAgent={(agentId) => {
          DeleteAgent(agentId);
          handlCloseDelete();
        }}
      />
    </Box>
  );
};

export default SettingAgent;
