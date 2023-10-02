import {
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

import { ActiveMenuItemColor } from '../../consts';
import { ShortUrl, User } from '../../types';

export interface ActionsButtonGroupProps<T, TKey> {
  model: T;
  onEdit: (model: T) => void;
  onDelete: (id: TKey) => void;
}

export const ShortUrlActionsButtonGroup = (props: ActionsButtonGroupProps<ShortUrl, string>) => {
  const { model, onEdit, onDelete } = props;

  return (
    <ButtonGroup variant="outlined">
      <Tooltip title="Edit short URL" arrow>
        <IconButton
          size="small"
          onClick={() => onEdit(model)}
          style={{ color: ActiveMenuItemColor }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete short URL" arrow>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(model.slug)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export const UserActionsButtonGroup = (props: ActionsButtonGroupProps<User, number>) => {
  const { model, onEdit, onDelete } = props;

  return (
    <ButtonGroup variant="outlined">
      <Tooltip title="Edit short URL" arrow>
        <IconButton
          size="small"
          onClick={() => onEdit(model)}
          style={{ color: ActiveMenuItemColor }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete short URL" arrow>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(model.id!)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};