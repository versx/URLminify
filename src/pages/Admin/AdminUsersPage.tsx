import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Checkbox,
  Container,
  Fab,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import moment from 'moment';
import { useSnackbar } from 'notistack';

import {
  Order, 
  StyledTableCell,
  StyledTableRow,
  UserActionsButtonGroup,
  UserTableHead,
  UserTableToolbar,
} from '../../components';
import { CreateUserDialog } from '../../dialogs';
import { getComparator, stableSort } from '../../modules';
import { UserService } from '../../services';
import { getUserToken } from '../../stores';
import { User } from '../../types';

interface UserTableState {
  open: boolean;
  editMode: boolean;
  editModel: User | undefined;
};

export const AdminUsersPage = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [state, setState] = useState<UserTableState>({
    open: false,
    editMode: false,
    editModel: undefined,
  });
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('id');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleReloadUsers = useCallback(() => {
    UserService.getUsers().then((response) => {
      //console.log('getUsers response:', response);
      if (response.status !== 'ok') {
        enqueueSnackbar('Error occurred reloading short URLs.', { variant: 'error' });
        return;
      }
      setRows(response.users);
    });
  }, [enqueueSnackbar]);

  const handleOpen = () => setState({...state, open: true, editMode: false, editModel: undefined});
  const handleClose = () => setState({...state, open: false, editMode: false, editModel: undefined});
  const handleSubmit = () => {
    enqueueSnackbar(`User account ${state.editMode ? 'updated' : 'created'} successfully!`, { variant: 'success' });

    setState({
      ...state,
      open: false,
      editMode: false,
      editModel: undefined,
    });
    handleReloadUsers();
  };

  const handleEditUser = (user: User) => {
    setState({
      ...state,
      open: true,
      editMode: true,
      editModel: user,
    });
  };

  const handleDeleteUsers = async () => {
    if (selected.length === 0) {
      return;
    }

    const result = window.confirm(`Are you sure you want to delete ${selected.length.toLocaleString()} user accounts?`);
    if (!result) {
      return;
    }

    let error = false;
    for (const userId of selected) {
      const response = await UserService.deleteAccount(userId);
      if (response.status !== 'ok') {
        //console.error('handleDelete response:', response);
        enqueueSnackbar('Error occurred deleting user account.', { variant: 'error' });
        error = true;
      }
    }

    setSelected([]);
    handleReloadUsers();

    if (!error) {
      enqueueSnackbar('User account deleted successfully!', { variant: 'success' });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const result = window.confirm(`Are you sure you want to delete user ${userId}?`);
    if (!result) {
      return;
    }

    const response = await UserService.deleteAccount(userId);
    if (response.status !== 'ok') {
      console.error('deleteAccount response:', response);
      enqueueSnackbar('Error occurred deleting user.', { variant: 'error' });
      return;
    }

    enqueueSnackbar('User account deleted successfully!', { variant: 'success' });

    setSelected([]);
    handleReloadUsers();
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: MouseEvent<unknown>, userId: number) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (userId: number) => selected.indexOf(userId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() =>
    stableSort(rows, getComparator<User, keyof User>(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
  [order, orderBy, page, rows, rowsPerPage]);

  useEffect(() => {
    if (!currentUser?.admin) {
      return;
    }
    handleReloadUsers();
  }, [currentUser?.admin, handleReloadUsers]);

  return (
    <Container sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Admin - Users
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tooltip
          title="Create user account"
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpen}
            style={{
              position: 'absolute',
              bottom: 32,
              right: 32,
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        <UserTableToolbar
          numSelected={selected.length}
          onDelete={handleDeleteUsers}
        />
        <TextField
          color="primary"
          variant="outlined"
          placeholder="Search..."
          value={search}
          size="small"
          type="search"
          style={{
            display: 'flex',
            alignItems: 'end',
            marginBottom: 3,
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <UserTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isAdmin={true}
            />
            <TableBody>
              {visibleRows.map((row: User, index: number) => {
                const isItemSelected = isSelected(row.id!);
                const labelId = `enhanced-table-checkbox-${index}`;
                if (search !== '' && !(row.id!.toString().includes(search) || row.username.includes(search))) {
                  return '';
                }

                return (
                  <StyledTableRow
                    hover
                    key={row.id}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event: any) => handleRowClick(event, row.id!)}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      id={labelId}
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <strong>{row.id}</strong>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {(row.shortUrls?.length ?? 0).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.enabled ? 'Yes' : 'No'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.admin ? 'Yes' : 'No'}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      title={moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    >
                      {moment(row.createdAt).calendar()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <UserActionsButtonGroup
                        model={row}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, { value: -1, label: 'All' }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <CreateUserDialog
        open={state.open}
        editMode={state.editMode}
        model={state.editModel}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};