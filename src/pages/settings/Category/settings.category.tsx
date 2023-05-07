import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useMutation, useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import TableView from "../../../components/TableView";
import { columnsIdent, columnsCat } from "./+columns";
import service from "../../../services/service";
import { SETTINGS_CATEGORY } from "../../../utils/const";
import { Category, Identification } from "../../../types";
import CategoryDelete from "./settings.deleteCategory";
import CategoryDialog from "./settings.dialogCategory";
import { GridRowParams } from "@mui/x-data-grid";

const defaultCategory: Category = {
  id: 0,
  catDescription: "",
  created_dt: new Date(),
  updated_dt: new Date(),
  identifications: [],
};
const SettingCategory = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean>(true);
  const [category, setCategory] = React.useState<Category>();
  const [idents, setIdents] = React.useState<Identification[]>();

  const { data, refetch: getList } = useQuery({
    queryKey: SETTINGS_CATEGORY,
    queryFn: service.getCategory,
  });

  React.useEffect(() => {
    getList();
  }, []);

  const handleOpenDialog = () => {
    setIsNew(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    defaultCategory.identifications = [];
    setCategory(defaultCategory);
    setIsNew(true);
    setOpenDialog(false);
  };

  const handlCloseDelete = () => {
    setDeleteDialog(false);
  };

  const { mutate: InsertCategory, isLoading: insertLoading } = useMutation(
    service.addCategory,
    {
      onSuccess: (data) => {
        getList();
        setIdents(undefined);
        toast.success(`Category Added Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: UpdateCategory, isLoading: updateLoading } = useMutation(
    service.updateCategory,
    {
      onSuccess: (data) => {
        getList();
        setIdents(undefined);
        toast.success(`Category Updated Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const { mutate: DeleteCategory, isLoading: deleteLoading } = useMutation(
    service.deleteCategory,
    {
      onSuccess: (data) => {
        getList();
        toast.error(`Category Deleted Succesfully!`);
      },
      onError: () => {
        toast.error(`Something went wrong!`);
      },
    }
  );

  const handleSubmit = (isNew: boolean, category?: Category) => {
    if (category && category.catDescription) {
      if (isNew) {
        InsertCategory(category);
      } else {
        UpdateCategory(category);
      }

      handleCloseDialog();
    }
  };

  const handleDialogEdit = (category: Category) => {
    setCategory(category);
    setIsNew(false);
    setOpenDialog(true);
  };

  const handleDialogDelete = (category: Category) => {
    setCategory(category);
    setDeleteDialog(true);
  };

  const handleSelectRow = (params?: GridRowParams<any>) => {
    setIdents(params?.row.identifications);
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
        Category
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TableView
            onClick={handleSelectRow}
            columns={columnsCat({
              onEdit: handleDialogEdit,
              onDelete: handleDialogDelete,
            })}
            data={data?.data}
            loading={false}
          />
        </Grid>
        <Grid item xs={6}>
          <TableView columns={columnsIdent} data={idents} loading={false} />
        </Grid>
      </Grid>
      <CategoryDialog
        category={category ?? defaultCategory}
        setCategory={(category) => {
          setCategory(category);
        }}
        state={openDialog}
        isNew={isNew}
        closeDialog={handleCloseDialog}
        submit={(category) => {
          handleSubmit(isNew, category);
        }}
      />
      <CategoryDelete
        category={category ?? defaultCategory}
        state={deleteDialog}
        closeDialog={handlCloseDelete}
        deleteCategory={(categoryId) => {
          if (categoryId) DeleteCategory(categoryId);
          handlCloseDelete();
        }}
      />
    </Box>
  );
};

export default SettingCategory;
