import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { agents } from "../../../types";

type ColumnEvent = {
  onEdit: (agent: agents) => void;
  onDelete: (agent: agents) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        const agent = param.row;
        return (
          <>
            <IconButton
              color="info"
              onClick={() => {
                onEdit(agent);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(agent)}>
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
      field: "agentFirstName",
      headerName: "First Name",
      width: 360,
    },
    {
      field: "agentLastName",
      headerName: "Last Name",
      width: 360,
    },
  ];
};
