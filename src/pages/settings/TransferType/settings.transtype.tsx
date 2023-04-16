import { Box, Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TableView from "../../../components/TableView";
import { columns } from "./+columns";
import service from "../../../services/service";
import { SETTINGS_TRANSTYPE } from "../../../utils/const";
import { transferTypes } from "../../../types";
import TransferTypeDialog from "./settings.dialogTransType";
import TransferTypeDelete from "./settings.deleteTransType";

const defaultTransType: transferTypes = {
  id: 0,
  transTypeDescription: "",
  created_dt: new Date(),
  updated_dt: new Date(),
};

const SettingTransType = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean>(true);
  const [trans, setTrans] = React.useState<transferTypes>(defaultTransType);
  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_TRANSTYPE,
    queryFn: service.getTransferTypes,
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
    setTrans(defaultTransType);
    setOpenDialog(false);
  };

  const handlCloseDelete = () => {
    setTrans(defaultTransType);
    setDeleteDialog(false);
  };

  const { mutate: InsertTransType, isLoading: insertLoading } = useMutation(
    service.addTransType,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Transfer Type Added Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: UpdateTransType, isLoading: updateLoading } = useMutation(
    service.updateTransType,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Transfer Type Updated Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: DeleteTransType, isLoading: deleteLoading } = useMutation(
    service.deleteTransType,
    {
      onSuccess: (data) => {
        getList();
        toast.error(`Transfer Type Deleted Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const handleSubmit = (trans: transferTypes, isNew: boolean) => {
    if (isNew) {
      InsertTransType(trans);
    } else {
      UpdateTransType(trans);
    }

    handleCloseDialog();
  };

  const handleDialogEdit = (trans: transferTypes) => {
    setTrans(trans);
    setIsNew(false);
    setOpenDialog(true);
  };

  const handleDialogDelete = (trans: transferTypes) => {
    setTrans(trans);
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
        Transfer Types
      </Button>
      <TableView
        columns={columns({
          onEdit: handleDialogEdit,
          onDelete: handleDialogDelete,
        })}
        data={data?.data}
        loading={false}
      />
      <TransferTypeDialog
        trans={trans}
        setTransType={(trans) => {
          setTrans(trans);
        }}
        state={openDialog}
        isNew={isNew}
        closeDialog={handleCloseDialog}
        submit={(trans) => {
          handleSubmit(trans, isNew);
        }}
      />
      <TransferTypeDelete
        trans={trans}
        state={deleteDialog}
        closeDialog={handlCloseDelete}
        deleteTransType={(transId) => {
          DeleteTransType(transId);
          handlCloseDelete();
        }}
      />
    </Box>
  );
};

export default SettingTransType;
