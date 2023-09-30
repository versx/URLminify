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

import { HeadCell, StyledTableCell, StyledTableRow, TableProps } from '..';
import { ShortUrl } from '../../types';

const headCells: readonly HeadCell<ShortUrl>[] = [
  {
    id: 'slug',
    disablePadding: true,
    align: 'left',
    label: 'Slug',
  },
  {
    id: 'originalUrl',
    disablePadding: false,
    align: 'left',
    label: 'Original Url',
  },
  {
    id: 'visits',
    disablePadding: false,
    align: 'right',
    label: 'Visits',
  },
  {
    id: 'expiry',
    disablePadding: false,
    align: 'right',
    label: 'Expires',
  },
  {
    id: 'enabled',
    disablePadding: false,
    align: 'right',
    label: 'Enabled',
  },
  {
    id: 'userId',
    disablePadding: false,
    align: 'right',
    label: 'User ID',
    isAdmin: true,
  },
  {
    id: 'createdAt',
    disablePadding: false,
    align: 'right',
    label: 'Created',
  },
];

export const ShortUrlTableHead = (props: TableProps<ShortUrl>) => {
  const {
    order, orderBy, numSelected, rowCount, isAdmin,
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
        {headCells.map((headCell) => ((isAdmin && (headCell.isAdmin || !headCell.isAdmin)) || (!isAdmin && !headCell.isAdmin)) && (
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