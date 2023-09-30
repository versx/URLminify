import { ChangeEvent, MouseEvent } from 'react';

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  disablePadding: boolean;
  minWidth?: number;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit' | undefined;
  //format?: (value: number) => string;
};

export interface TableProps<T> {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export interface TableToolbarProps {
  numSelected: number;
  onDelete: () => void;
};