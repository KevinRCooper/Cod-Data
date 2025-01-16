import { TableRow } from "@/types/TableRow.types";
import { GridColDef } from "@mui/x-data-grid";

export type UploadProps ={
    onDataUploaded: (columns: GridColDef[], rows: TableRow[]) => void;
}