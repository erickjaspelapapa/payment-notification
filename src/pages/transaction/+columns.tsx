import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Transaction } from "../../types";
import { format } from "date-fns";
import NumericInput from "material-ui-numeric-input";

type ColumnEvent = {
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};
const columns = ({ onEdit, onDelete }: ColumnEvent): GridColDef[] => {
  return [
    {
      field: "action",
      headerName: "Action",
      renderCell: (param) => {
        const trans = param.row;
        return (
          <>
            <IconButton
              color="info"
              onClick={() => {
                onEdit(trans);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(trans)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Id",
      width: 50,
    },
    {
      field: "transDate",
      headerName: "Date",
      width: 150,
      valueFormatter: (param) => {
        if (param.value === null) {
          return "-";
        }
        const newDate = new Date(param.value);
        return format(newDate, "MMMM dd, yyyy");
      },
    },
    {
      field: "amount",
      headerName: "Transaction",
      align: "right",
      width: 200,
      renderCell: (param) => (
        <NumericInput
          precision={2}
          decimalChar="."
          thousandChar=","
          value={param.row.amount}
          variant="outlined"
          sx={{ textAlignLast: "right" }}
        />
      ),
    },
    {
      field: "catId",
      headerName: "Category",
      width: 250,
      valueGetter: (param) =>
        param.row.category == null ? "-" : param.row.category.catDescription,
    },
    {
      field: "identId",
      headerName: "Identification",
      width: 250,
      valueGetter: (param) =>
        param.row.identification == null
          ? "-"
          : param.row.identification.idenDescription,
    },
    {
      field: "transDescription",
      headerName: "Description",
      width: 500,
      valueGetter: (param) => param.row.transDescription ?? "-",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 500,
      valueGetter: (param) => param.row.remarks ?? "-",
    },
  ];
};

export default columns;
