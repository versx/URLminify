import React, { MouseEvent } from 'react';
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import {
  ArrowDownward as ArrowDownwardIcon,
  //ArrowUpward as ArrowUpwardIcon,
} from '@mui/icons-material';

import { HeadCell, TableProps } from '.';
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
    id: 'enabled',
    disablePadding: false,
    align: 'right',
    label: 'Enabled',
  },
  {
    id: 'admin',
    disablePadding: false,
    align: 'right',
    label: 'Is Admin',
  },
  {
    id: 'createdAt',
    disablePadding: false,
    align: 'right',
    label: 'Created',
  },
  {
    id: 'updatedAt',
    disablePadding: false,
    align: 'right',
    label: 'Updated',
  },
  {
    id: 'shortUrls',
    disablePadding: false,
    align: 'right',
    label: 'URLs count',
  },
];

export const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#303030', //theme.palette.common.black,
    color: 'white', //theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
            style={{ minWidth: headCell.minWidth, color: 'white' }}
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