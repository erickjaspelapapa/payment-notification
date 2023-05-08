import { Box, Button } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TableView from "../../components/TableView";
import service from "../../services/service";
import { Category, TransPayload, Transaction } from "../../types";
import { SETTINGS_CATEGORY, TRANSACTION_LIST } from "../../utils/const";
import columns from "./+columns";
import TransactionDelete from "./transaction.deleteTrans";
import TransactionDialog from "./transaction.dialog";

const defaultTransaction: TransPayload = {
  id: 0,
  created_dt: new Date(),
  updated_dt: new Date(),
  transDate: new Date(),
  amount: 0,
  transDescription: "",
  remarks: "",
};

const defaultCategory: Category = {
  id: 0,
  created_dt: new Date(),
  updated_dt: new Date(),
  catDescription: "",
  identifications: [],
};

const TransactionList = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean>(true);
  const [transaction, setTransaction] = React.useState<
    TransPayload | Transaction
  >();
  const [currCategory, setCurrCategory] = React.useState<Category>();

  const { data, refetch: getList } = useQuery({
    queryKey: TRANSACTION_LIST,
    queryFn: service.getTransaction,
  });

  const { data: categories, refetch: getCategories } = useQuery({
    queryKey: SETTINGS_CATEGORY,
    queryFn: service.getCategory,
  });

  React.useEffect(() => {
    getList();
    getCategories();
  }, []);

  const handleOpenDialog = () => {
    setIsNew(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setTransaction(undefined);
    setIsNew(true);
    setOpenDialog(false);
  };

  const handlCloseDelete = () => {
    setDeleteDialog(false);
  };

  const { mutate: InsertTransaction, isLoading: insertLoading } = useMutation(
    service.addTransaction,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Transaction Added Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: UpdateTransaction, isLoading: updateLoading } = useMutation(
    service.updateTransaction,
    {
      onSuccess: (data) => {
        getList();
        toast.success(`Transaction Updated Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: DeleteTransaction, isLoading: deleteLoading } = useMutation(
    service.deleteTransaction,
    {
      onSuccess: (data) => {
        getList();
        toast.error(`Transaction Deleted Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const handleSubmit = (transaction: Transaction, isNew: boolean) => {
    if (isNew) {
      InsertTransaction(transaction);
    } else {
      UpdateTransaction(transaction);
    }

    handleCloseDialog();
  };

  const handleDialogEdit = (transaction: Transaction) => {
    setTransaction(transaction);
    const currCat = categories?.data.find((f) => f.id == transaction.catId);
    setCurrCategory(currCat);
    setIsNew(false);
    setOpenDialog(true);
  };

  const handleDialogDelete = (transaction: Transaction) => {
    setTransaction(transaction);
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
        Transactions
      </Button>
      <TableView
        columns={columns({
          onEdit: handleDialogEdit,
          onDelete: handleDialogDelete,
        })}
        data={data?.data}
        loading={false}
      />
      <TransactionDialog
        categories={categories?.data}
        currCategory={currCategory ?? defaultCategory}
        transaction={transaction ?? defaultTransaction}
        setTransaction={(transaction) => {
          setTransaction(transaction);
        }}
        state={openDialog}
        isNew={isNew}
        closeDialog={handleCloseDialog}
        submit={(transaction) => {
          handleSubmit(transaction, isNew);
        }}
      />
      <TransactionDelete
        transaction={transaction ?? defaultTransaction}
        state={deleteDialog}
        closeDialog={handlCloseDelete}
        deleteTransaction={(agentId) => {
          DeleteTransaction(agentId);
          handlCloseDelete();
        }}
      />
    </Box>
  );
};

export default TransactionList;
