import React, { MouseEvent } from 'react';
import {
  Box,
  Checkbox,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import {
  ArrowDownward as ArrowDownwardIcon,
  //ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';

import { HeadCell, TableProps, StyledTableCell, StyledTableRow } from '..';
import { User } from '../../types';

const headCells: readonly HeadCell<User>[] = [
  {
    id: 'id',
    disablePadding: true,
    align: 'left',
    label: 'ID',
  },
  {
    id: 'username',
    disablePadding: false,
    align: 'left',
    label: 'Username',
  },
  {
    id: 'shortUrls',
    disablePadding: false,
    align: 'right',
    label: 'No. URLs',
  },
  {
    id: 'enabled',
    disablePadding: false,
    align: 'right',
    label: 'Enabled',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
  {
    id: 'admin',
    disablePadding: false,
    align: 'right',
    label: 'Admin',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
  {
    id: 'createdAt',
    disablePadding: false,
    align: 'right',
    label: 'Created',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
];

export const UserTableHead = (props: TableProps<User>) => {
  const {
    order, orderBy, numSelected, rowCount,
    onRequestSort, onSelectAllClick,
  } = props;

  const createSortHandler = (property: keyof User) => (event: MouseEvent<unknown>) => onRequestSort(event, property);

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all short URLs',
            }}
            style={{color: 'white'}}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align ?? 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ minWidth: headCell.minWidth, color: 'white', ...headCell.style }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              style={{color: 'white'}}
              IconComponent={ArrowDownwardIcon}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell align="right">
          <strong>Actions</strong>
        </StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};