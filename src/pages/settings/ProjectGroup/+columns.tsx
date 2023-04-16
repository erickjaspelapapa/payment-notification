import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "Action",
    renderCell: (param) => (
      <>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </>
    ),
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
