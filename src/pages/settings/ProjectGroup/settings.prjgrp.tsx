import { Box, Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TableView from "../../../components/TableView";
import { columns } from "./+columns";
import service from "../../../services/service";
import { SETTINGS_PRJGRP } from "../../../utils/const";
import { projectGroups } from "../../../types";
import ProjGroupDialog from "./settings.dialogPrjGrp";
import ProjGroupDelete from "./settings.deletePrjGrp";

const defaultPrjGroup: projectGroups = {
  id: 0,
  projGrpDescription: "",
  created_dt: new Date(),
  updated_dt: new Date(),
};

const SettingPrjGrp = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean>(true);
  const [prjGrp, setPrjGrp] = React.useState<projectGroups>(defaultPrjGroup);
  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_PRJGRP,
    queryFn: service.getProjectGroups,
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
    setPrjGrp(defaultPrjGroup);
    setOpenDialog(false);
  };

  const handlCloseDelete = () => {
    setPrjGrp(defaultPrjGroup);
    setDeleteDialog(false);
  };

  const { mutate: InsertPrjGrp, isLoading: insertLoading } = useMutation(
    service.addProjectGroups,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Project Group Added Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: UpdatePrjGrp, isLoading: updateLoading } = useMutation(
    service.updateProjectGroups,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Project Group Updated Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: DeletePrjGrp, isLoading: deleteLoading } = useMutation(
    service.deleteProjectGroups,
    {
      onSuccess: (data) => {
        getList();
        toast.error(`Project Group Deleted Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const handleSubmit = (prjGrp: projectGroups, isNew: boolean) => {
    if (isNew) {
      InsertPrjGrp(prjGrp);
    } else {
      UpdatePrjGrp(prjGrp);
    }

    handleCloseDialog();
  };

  const handleDialogEdit = (prjGrp: projectGroups) => {
    setPrjGrp(prjGrp);
    setIsNew(false);
    setOpenDialog(true);
  };

  const handleDialogDelete = (prjGrp: projectGroups) => {
    setPrjGrp(prjGrp);
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
        Project Groups
      </Button>
      <TableView
        columns={columns({
          onEdit: handleDialogEdit,
          onDelete: handleDialogDelete,
        })}
        data={data?.data}
        loading={false}
      />
      <ProjGroupDialog
        prjGrp={prjGrp}
        setProjGrp={(prjGrp) => {
          setPrjGrp(prjGrp);
        }}
        state={openDialog}
        isNew={isNew}
        closeDialog={handleCloseDialog}
        submit={(prjGrp) => {
          handleSubmit(prjGrp, isNew);
        }}
      />
      <ProjGroupDelete
        prjGrp={prjGrp}
        state={deleteDialog}
        closeDialog={handlCloseDelete}
        deletePrjGrp={(prjGrpId) => {
          DeletePrjGrp(prjGrpId);
          handlCloseDelete();
        }}
      />
    </Box>
  );
};

export default SettingPrjGrp;
