import { GridColDef } from "@mui/x-data-grid";

export const MarkerTableColumns: GridColDef[] = [
    { field: 'statusColor', headerName: 'Status color', flex: 0.5, type: 'number', headerAlign: 'center', renderCell: (params) => {
      return (
        <span className={`dot-${params.row.statusColor}`}><p className='dot-additional'>&#33;</p></span>
      );
   } },
    { field: 'name', headerName: 'Container name', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'ifChecked', headerName: 'Checked (yes/no)', flex: 1, type: 'boolean', headerAlign: 'center', align: 'center' },
    { field: 'correctness',  headerName: 'Correctness (yes/no) / degree of correctness',  flex: 1.3, type: 'string', headerAlign: 'center', align: 'center' },
    { field: 'notes', headerName: 'Notes', flex: 1.2, headerAlign: 'center', align: 'center' }
];