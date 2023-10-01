import {
  Box,
  Checkbox,
  TableHead,
  TableSortLabel,
} from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';

import {
  HeadCell,
  StyledTableCell,
  StyledTableRow,
  TableProps,
} from '..';
import { ShortUrl, User } from '../../types';

export const ShortUrlTableHeadCells: readonly HeadCell<ShortUrl>[] = [
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
    style: { display: { xs: 'none', sm: 'table-cell' } },
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
    align: 'left',
    label: 'Expires',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
  {
    id: 'enabled',
    disablePadding: false,
    align: 'right',
    label: 'Enabled',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
  {
    id: 'userId',
    disablePadding: false,
    align: 'right',
    label: 'User',
    isAdmin: true,
  },
  {
    id: 'createdAt',
    disablePadding: false,
    align: 'right',
    label: 'Created',
    style: { display: { xs: 'none', sm: 'table-cell' } },
  },
];

export const UserTableHeadCells: readonly HeadCell<User>[] = [
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

export const SortableTableHead = <T extends unknown>(props: TableProps<T>) => {
  const {
    headCells, isAdmin,
    order, orderBy, numSelected, rowCount,
    onRequestSort, onSelectAllClick,
  } = props;

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
              'aria-label': 'select all',
            }}
            style={{color: 'white'}}
          />
        </StyledTableCell>
        {headCells.map((headCell: HeadCell<T>, index: number) => ((isAdmin && (headCell.isAdmin || !headCell.isAdmin)) || (!isAdmin && !headCell.isAdmin)) && (
          <StyledTableCell
            key={index}
            align={headCell.align ?? 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ minWidth: headCell.minWidth, color: 'white', ...headCell.style, whiteSpace: 'nowrap' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              style={{color: 'white'}}
              IconComponent={ArrowDownwardIcon}
              onClick={onRequestSort(headCell.id as keyof T)}
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