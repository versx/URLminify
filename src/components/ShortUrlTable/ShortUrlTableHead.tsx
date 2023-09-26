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

import { HeadCell, ShortUrlTableProps } from '.';
import { ShortUrl } from '../../types';

const headCells: readonly HeadCell[] = [
  {
    id: 'slug',
    disablePadding: true,
    numeric: false,
    label: 'Slug',
  },
  {
    id: 'originalUrl',
    disablePadding: false,
    numeric: false,
    label: 'Original Url',
  },
  {
    id: 'visits',
    disablePadding: false,
    numeric: true,
    label: 'Visits',
  },
  {
    id: 'createdAt',
    disablePadding: false,
    numeric: true,
    label: 'Created',
  },
];

const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#303030', //theme.palette.common.black,
    color: 'white', //theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const ShortUrlTableHead = (props: ShortUrlTableProps) => {
  const {
    order, orderBy, numSelected, rowCount,
    onRequestSort, onSelectAllClick,
  } = props;

  const createSortHandler = (property: keyof ShortUrl) => (event: MouseEvent<unknown>) => onRequestSort(event, property);

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
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              style={{color: 'white'}}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell align="right">
          Actions
        </StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};