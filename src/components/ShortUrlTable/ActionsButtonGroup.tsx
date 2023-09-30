import {
  ButtonGroup,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

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
      <IconButton
        title="Edit short URL"
        size="small"
        onMouseOver={(event: any) => event.target.style.color = 'dodgerblue'}
        onMouseOut={(event: any) => event.target.style.color = 'rgba(0, 0, 0, 0.54)'}
        onClick={() => onEdit(model)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title="Delete short URL"
        size="small"
        onMouseOver={(event: any) => event.target.style.color = 'red'}
        onMouseOut={(event: any) => event.target.style.color = 'rgba(0, 0, 0, 0.54)'}
        onClick={() => onDelete(model.slug)}
      >
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export const UserActionsButtonGroup = (props: ActionsButtonGroupProps<User, number>) => {
  const { model, onEdit, onDelete } = props;

  return (
    <ButtonGroup variant="outlined">
      <IconButton
        title="Edit short URL"
        size="small"
        onMouseOver={(event: any) => event.target.style.color = 'dodgerblue'}
        onMouseOut={(event: any) => event.target.style.color = 'rgba(0, 0, 0, 0.54)'}
        onClick={() => onEdit(model)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title="Delete short URL"
        size="small"
        onMouseOver={(event: any) => event.target.style.color = 'red'}
        onMouseOut={(event: any) => event.target.style.color = 'rgba(0, 0, 0, 0.54)'}
        onClick={() => onDelete(model.id!)}
      >
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  );
};