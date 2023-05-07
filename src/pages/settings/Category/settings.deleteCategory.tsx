import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Category } from "../../../types";

type CategoryDeleteProps = {
  category: Category;
  state: boolean;
  closeDialog: () => void;
  deleteCategory: (categoryId?: number) => void;
};

const CategoryDelete = ({
  category,
  state,
  closeDialog,
  deleteCategory,
}: CategoryDeleteProps) => {
  return (
    <Dialog open={state} onClose={closeDialog}>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Do you want to delete Category [${category.catDescription}] ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => deleteCategory(category.id)}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDelete;
