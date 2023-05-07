import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { Category, Identification } from "../../../types";

type IdentificationContainerProps = {
  ident: Identification;
  setIdent: (ident: Identification) => void;
  removeIdent: () => void;
};

const IdentificationContainer = ({
  ident,
  setIdent,
  removeIdent,
}: IdentificationContainerProps) => {
  return (
    <Stack direction={"row"} sx={{ marginBottom: 1 }}>
      <IconButton onClick={removeIdent}>
        <CancelIcon />
      </IconButton>
      <TextField
        margin="none"
        fullWidth
        label=""
        value={ident.idenDescription}
        onChange={(evt) =>
          setIdent({ ...ident, idenDescription: evt.target.value })
        }
      />
    </Stack>
  );
};

type CategoryDialogProps = {
  category: Category;
  setCategory: (category?: Category) => void;
  isNew: boolean;
  state: boolean;
  closeDialog: () => void;
  submit: (category?: Category) => void;
};

const defaultIdent: Identification = {
  id: 0,
  catId: 0,
  updated_dt: new Date(),
  created_dt: new Date(),
  idenDescription: "",
};
const CategoryDialog = ({
  category,
  state,
  isNew,
  setCategory,
  closeDialog,
  submit,
}: CategoryDialogProps) => {
  const [identification, setIdentification] = React.useState<Identification>();

  const handleAddIdentification = () => {
    if (identification?.idenDescription) {
      const ident = [...category.identifications];
      const newIdentification: Identification = {
        ...identification,
      };

      // newCategory.identifications.push({ ...newIdentification });
      setCategory({
        ...category,
        identifications: [...ident, { ...newIdentification }],
      });
      setIdentification(defaultIdent);
    }
  };

  const handleCloseDialog = () => {
    setIdentification(defaultIdent);
    closeDialog();
  };

  return (
    <Dialog fullWidth open={state} onClose={handleCloseDialog}>
      <DialogTitle>{`${isNew ? "New" : "Update"} Category`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="Category"
          label="Category"
          value={category?.catDescription}
          onChange={(evt) =>
            setCategory({
              ...category,
              catDescription: evt.target.value,
            })
          }
          fullWidth
        />
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <Stack direction={"row"}>
          <TextField
            autoFocus
            margin="dense"
            label="Add Identification"
            value={identification?.idenDescription}
            onChange={(evt) =>
              setIdentification({
                updated_dt: new Date(),
                created_dt: category.created_dt,
                catId: category.id,
                idenDescription: evt.target.value,
              })
            }
            fullWidth
          />
          <IconButton onClick={handleAddIdentification}>
            <AddCircleIcon />
          </IconButton>
        </Stack>
        <Card>
          <CardHeader title="Identifications" />
          <Divider />
          <CardContent>
            {category?.identifications?.map((ident, index) => {
              return (
                <IdentificationContainer
                  key={index}
                  ident={ident}
                  setIdent={(ident) => {
                    const curridentifications = [...category.identifications];
                    curridentifications?.splice(index, 1, ident);
                    setCategory({
                      ...category,
                      identifications: [...curridentifications],
                    });
                  }}
                  removeIdent={() => {
                    const curridentifications = [...category.identifications];
                    curridentifications?.splice(index, 1);
                    setCategory({
                      ...category,
                      identifications: [...curridentifications],
                    });
                  }}
                />
              );
            })}
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => submit(category)}
          variant="contained"
          color="info"
        >
          {isNew ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
