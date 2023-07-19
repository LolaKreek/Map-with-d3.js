import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { LoaderTypes } from "./types"
import { v4 as uuidv4 } from 'uuid';

const TableLoader = ({rowsNumber}: LoaderTypes.LoaderTableProps) => {
    return(
        <div className='markers-table__wrapper'>
            <Skeleton animation="wave" variant="text" sx={{height: '70px'}} />

            <Table>
                <TableBody>
                    {[...Array(rowsNumber)].map(() => (
                        <TableRow key={uuidv4()}>
                          <TableCell component="th" scope="row">
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton animation="wave" variant="text" />
                          </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TableLoader