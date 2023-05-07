import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Category } from "../../../types";

type ColumnEvent = {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export const columnsCat = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        const category = param.row;
        return (
          <>
            <IconButton
              color="info"
              onClick={() => {
                onEdit(category);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(category)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "catDescription",
      headerName: "Category",
      flex: 1,
    },
  ];
};

export const columnsIdent: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "idenDescription",
    headerName: "Identification",
    flex: 1,
  },
];
