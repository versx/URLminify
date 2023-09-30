import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Checkbox,
  Fab,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material'
import moment from 'moment';
import { useSnackbar } from 'notistack';

import {
  ActionsButtonGroup,
  Order,
  ShortUrlTableHead,
  ShortUrlTableToolbar,
  StyledTableCell,
  StyledTableRow,
} from '..';
import { CreateShortUrlDialog } from '../../dialogs';
import { getComparator, stableSort, substr } from '../../modules';
import { ShortUrlService } from '../../services';
import { getUserToken } from '../../stores';
import { ShortUrl } from '../../types';

interface ShortUrlTableState {
  open: boolean;
  editMode: boolean;
  editModel: ShortUrl | undefined;
};

export const UserTable = (props: any) => {
  //console.log('ShortUrlTable props:', props);
  const [rows, setRows] = useState<ShortUrl[]>([]);
  const [state, setState] = useState<ShortUrlTableState>({
    open: false,
    editMode: false,
    editModel: undefined,
  });
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ShortUrl>('slug');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleReloadShortUrls = useCallback(() => {
    ShortUrlService.getShortUrls(currentUser?.id).then((response) => {
      if (response.status !== 'ok') {
        //console.error(response);
        enqueueSnackbar('Error occurred reloading short URLs.', { variant: 'error' });
        return;
      }
      setRows(response.shortUrls);
    });
  }, [currentUser?.id, enqueueSnackbar]);

  const handleOpen = () => setState({...state, open: true, editMode: false, editModel: undefined});
  const handleClose = () => setState({...state, open: false, editMode: false, editModel: undefined});
  const handleSubmit = () => {
    enqueueSnackbar(`Short URL ${state.editMode ? 'updated' : 'created'} successfully!`, { variant: 'success' });

    setState({
      ...state,
      open: false,
      editMode: false,
      editModel: undefined,
    });
    handleReloadShortUrls();
  };

  const handleEditShortUrl = (shortUrl: ShortUrl) => {
    setState({
      ...state,
      open: true,
      editMode: true,
      editModel: shortUrl,
    });
  };

  const handleDeleteShortUrls = async () => {
    if (selected.length === 0) {
      return;
    }

    const result = window.confirm(`Are you sure you want to delete ${selected.length.toLocaleString()} short URLs?`);
    if (!result) {
      return;
    }

    let error = false;
    for (const slug of selected) {
      const response = await ShortUrlService.deleteShortUrl(slug);
      if (response.status !== 'ok') {
        //console.error('handleDelete response:', response);
        enqueueSnackbar('Error occurred reloading short URLs.', { variant: 'error' });
        error = true;
      }
    }

    setSelected([]);
    handleReloadShortUrls();

    if (!error) {
      enqueueSnackbar('Short URL deleted successfully!', { variant: 'success' });
    }
  };

  const handleDeleteShortUrl = async (slug: string) => {
    if (!slug) {
      return;
    }

    const result = window.confirm(`Are you sure you want to delete short URL ${slug}?`);
    if (!result) {
      return;
    }

    const response = await ShortUrlService.deleteShortUrl(slug);
    if (response.status !== 'ok') {
      console.error('handleDeleteShortUrl response:', response);
      enqueueSnackbar('Error occurred deleting short URLs.', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Short URL deleted successfully!', { variant: 'success' });

    setSelected([]);
    handleReloadShortUrls();
  };

  const handleLinkClick = (event: any, shortUrl: ShortUrl) => {
    const result = window.confirm(`Are you sure you want to visit ${shortUrl.originalUrl}?`);
    if (!result) {
      event.preventDefault();
      return false;
    }
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof ShortUrl) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.slug);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() =>
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
  [order, orderBy, page, rows, rowsPerPage]);

  useEffect(() => handleReloadShortUrls(), [handleReloadShortUrls]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tooltip
          title="Create short URL"
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

        <ShortUrlTableToolbar
          numSelected={selected.length}
          onDelete={handleDeleteShortUrls}
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
            <ShortUrlTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isAdmin={false}
            />
            <TableBody>
              {visibleRows.map((row: any, index: number) => { //ShortUrl
                const isItemSelected = isSelected(row.slug);
                const labelId = `enhanced-table-checkbox-${index}`;

                if (search !== '' && !(row.slug.includes(search) || row.originalUrl.includes(search))) {
                  return '';
                }

                return (
                  <StyledTableRow
                    hover
                    key={row.slug}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event: any) => handleRowClick(event, row.slug)}
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
                      <strong>{row.slug}</strong>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Tooltip title={row.originalUrl}>
                        <a
                          href={row.originalUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event: any) => handleLinkClick(event, row)}
                          style={{
                            textDecoration: 'none',
                            color: 'dodgerblue',
                          }}
                        >
                          {substr(row.originalUrl)}
                        </a>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.visits.toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.expiry ? moment(row.expiry).calendar() : ''}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.enabled ? 'Yes' : 'No'}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      title={moment(row.createdAt!).format('MMMM Do YYYY, h:mm:ss a')}
                    >
                      {moment(row.createdAt!).calendar()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionsButtonGroup
                        model={row}
                        onEdit={handleEditShortUrl}
                        onDelete={handleDeleteShortUrl}
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

      <CreateShortUrlDialog
        open={state.open}
        editMode={state.editMode}
        model={state.editModel}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};