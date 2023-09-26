import { ChangeEvent, MouseEvent } from 'react';

import { ShortUrl } from '../../types';

export type Order = 'asc' | 'desc';

export interface HeadCell {
  id: keyof ShortUrl;
  disablePadding: boolean;
  numeric: boolean;
  label: string;
};

export interface ShortUrlTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof ShortUrl) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export interface ShortUrlTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
};