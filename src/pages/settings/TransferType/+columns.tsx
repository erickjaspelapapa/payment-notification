import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { transferTypes } from "../../../types";

type ColumnEvent = {
  onEdit: (trans: transferTypes) => void;
  onDelete: (trans: transferTypes) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        const transType = param.row;
        return (
          <>
            <IconButton
              color="info"
              onClick={() => {
                onEdit(transType);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(transType)}>
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
      field: "transTypeDescription",
      headerName: "Transfer Type",
      width: 500,
    },
  ];
};
