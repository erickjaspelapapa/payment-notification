import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { projectGroups } from "../../../types";

type ColumnEvent = {
  onEdit: (prjGrp: projectGroups) => void;
  onDelete: (prjGrp: projectGroups) => void;
};

export const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        const prjGrp = param.row;
        return (
          <>
            <IconButton
              color="info"
              onClick={() => {
                onEdit(prjGrp);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(prjGrp)}>
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
      field: "projGrpDescription",
      headerName: "Project Group",
      width: 500,
    },
  ];
};
