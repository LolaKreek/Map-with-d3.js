import { Typography } from '@mui/material';
import { TableTypes } from './tyles';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { blueGrey, blue } from '@mui/material/colors';
import * as d3 from 'd3';
import './slyle.css';
import returnProjectionValueWhenValid from '../../features/worldMap/returnProjectionValueWhenValid';

const MarkerTable = ({coordinates, title, columns, markerRef}: TableTypes.TableProps) => {
    const rowsPerPage = 5;
    const cellHoverGrey = blueGrey[100];
    const headerBlue = blue[100];
    const markerSvg = d3.select(markerRef.current);

    const getBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color: string, mode: string) =>
        mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

    const setCurrentMarker = (ids: GridRowSelectionModel) => {
        const currentItem = coordinates.find(item => item.id == ids[0])
        if(currentItem){
            markerSvg.selectChild().remove()
            markerSvg.append('g').append('circle')
                .attr('cx', returnProjectionValueWhenValid([currentItem.latitude, currentItem.longitude], 0))
                .attr('cy', returnProjectionValueWhenValid([currentItem.latitude, currentItem.longitude], 1))
                .attr("r", 10)
                .attr("fill", currentItem.statusColor == 1 ? '#27AE60' : (currentItem.statusColor == 2 ? "#DF0B0B" : "#F2C94C"))
                .attr("className", 'markers-circle')
        }
    }

    return(
        <div className='markers-table__wrapper'>
            <Typography className='markers-table__main-header' variant="h4" component="h4">{title}</Typography>

            <DataGrid
                rows={coordinates}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: rowsPerPage } },
                }}
                pageSizeOptions={[5, 10, 25]}
                getRowHeight={() => 'auto'}
                sx={{
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                        py: '15px'
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
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'lightgrey!important'
                    },
                    '& .MuiDataGrid-booleanCell' : {
                        fontSize: '1.7em'
                    }

                }}
                getRowClassName={() => `super-app-theme-all`}
                onRowSelectionModelChange={(ids) => setCurrentMarker(ids)}
            />
        </div>
    )
}

export default MarkerTable;