import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

import { ShortUrlTableToolbarProps } from '.';

export const ShortUrlTableToolbar = (props: ShortUrlTableToolbarProps) => {
  const { numSelected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          id="tableTitle"
          variant="h3"
          component="div"
          sx={{ display: 'flex', flex: '1 1 100%', justifyContent: 'center' }}
        >
          Short Urls
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title={`Delete ${numSelected.toLocaleString()} selected short URLs`}
        >
          <IconButton
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          title="Filter list of items"
        >
          <IconButton
            onClick={() => console.log('filter:', numSelected)}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};