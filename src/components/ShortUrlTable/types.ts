import { ChangeEvent, MouseEvent } from 'react';

import { ShortUrl } from '../../types';

export type Order = 'asc' | 'desc';

export interface HeadCell {
  id: keyof ShortUrl;
  label: string;
  disablePadding: boolean;
  minWidth?: number;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit' | undefined;
  //format?: (value: number) => string;
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