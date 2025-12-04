/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | any },
  b: { [key in Key]: number | string | any }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableHeadProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const {
    order,
    orderBy,
    onRequestSort,
    headCells,
  } = props;

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
            key={"actions"}
            align={"center"}
            padding={"normal"}
          >
            Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  title: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { title } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: 'bold', color: '#1976d2' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
    </Toolbar>
  );
}

const defaultAction = <T,>( row: T)  => {
  console.log('Action on row', row);
}

interface EnhancedTableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  title?: string;
  initialOrderBy?: keyof T;
  withShow?: boolean;
  showAction?: (row: T) => void;
  withEdit?: boolean;
  editAction?: (row: T) => void;
  withDelete?: boolean;
  deleteAction?: (row: T) => void;
}

export const DataTable = <T extends { id: number | string }>({
  rows,
  headCells,
  title = "Table",
  initialOrderBy,
  withShow,
  showAction = defaultAction,
  withEdit,
  editAction = defaultAction,
  withDelete,
  deleteAction = defaultAction,
}: EnhancedTableProps<T>) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(
    initialOrderBy || (headCells[0]?.id as keyof T)
  );

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar title={title} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={String(orderBy)}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    {headCells.map((cell, cellIndex) => {
                      const cellValue = row[cell.id];
                      
                      if (cellIndex === 0) {
                        return (
                          <TableCell
                            key={String(cell.id)}
                            component="th"
                            id={labelId}
                            scope="row"
                          >
                            {cellValue as React.ReactNode}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={String(cell.id)}
                          align={cell.numeric ? "right" : "left"}
                        >
                          {cellValue as React.ReactNode}
                        </TableCell>
                      );
                    })}
                    <TableCell
                        key={`actions-${row.id}`}
                        align={"center"}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                          {withShow && <SearchOutlinedIcon onClick={() => showAction(row)} sx={{ color: '#1976d2', cursor: 'pointer' }} />}
                          {withEdit && <EditOutlinedIcon onClick={() => editAction(row)} sx={{ color: '#1976d2', cursor: 'pointer' }} />}
                          {withDelete && <DeleteOutlinedIcon onClick={() => deleteAction(row)} sx={{ color: '#d32f2f', cursor: 'pointer' }} />}
                        </Box>
                      </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length} 
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
