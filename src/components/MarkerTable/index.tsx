import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { TableTypes } from './types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import { blueGrey, blue } from '@mui/material/colors';
import '../MarkerTable/style.css';

const columns: GridColDef[] = [
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

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const MarkerTable: React.FC<TableTypes.TableProps> = ({ data, title }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cellHoverGrey = blueGrey[100];
  const headerBlue = blue[100];

  return (
    <div className='markers-table__wrapper'>
        <Typography className='markers-table__main-header' variant="h4" component="h4">{title}</Typography>

         <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: rowsPerPage } },
          }}
          pageSizeOptions={[5, 10, 25]}
          getRowHeight={() => 'auto'}
          sx={{
            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
              py: '15px',
            },
            '& .super-app-theme-all': {
              bgcolor: (theme) =>
                getBackgroundColor(theme.palette.common.white, theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) =>
                  getHoverBackgroundColor(cellHoverGrey, theme.palette.mode),
              },
            },
            '& .super-app-theme-header': {
              bgcolor: (theme) =>
                getBackgroundColor(headerBlue, theme.palette.mode),
              '&:hover': {
                bgcolor: (theme) =>
                  getHoverBackgroundColor(cellHoverGrey, theme.palette.mode),
              },
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FFC300",
              color: "black"
            }
          }}
          getRowClassName={() => `super-app-theme-all`}
        />
    </div>
  );
};

export default MarkerTable;