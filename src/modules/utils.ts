import { Order } from '../components';
import { ShortUrl } from '../types';

export const substr = (text: string, maxChars: number = 30, addEllipsis: boolean = true) => {
  if (text.length <= maxChars) {
    return text;
  }
  const result = text.substring(0, Math.min(text.length, maxChars));
  return addEllipsis ? result + '...' : result;
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export function getComparator<Key extends keyof ShortUrl>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]?: boolean | number | string | Date | null },
  b: { [key in Key]?: boolean | number | string | Date | null },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};