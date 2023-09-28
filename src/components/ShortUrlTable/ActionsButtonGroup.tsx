import {
  ButtonGroup,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

import { ShortUrl } from '../../types';

export interface ActionsButtonGroupProps {
  model: ShortUrl;
  onEdit: (shortUrl: ShortUrl) => void;
  onDelete: (slug: string) => void;
}

export const ActionsButtonGroup = (props: ActionsButtonGroupProps) => {
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