import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

import { ShortUrlService } from '../services';
import { ShortUrl } from '../types';

const userId = 1; // TODO: userId

interface CreateShortUrlDialogProps {
  open: boolean;
  editMode: boolean;
  model: ShortUrl | undefined;
  onSubmit: () => void;
  onClose: () => void;
};

interface CreateShortUrlDialogState {
  name?: string;
  url: string;
};

export const CreateShortUrlDialog = (props: CreateShortUrlDialogProps) => {
  //console.log('CreateShortUrlDialog props:', props);
  const { open, editMode = false, model, onSubmit, onClose } = props;

  const [state, setState] = useState<CreateShortUrlDialogState>({
    name: editMode ? model?.slug : '',
    url: editMode ? model?.originalUrl ?? '' : '',
  });

  const handleSubmit = async () => {
    if (!state.url) {
      // TODO: Show error
      return;
    }

    const response = editMode
      ? await ShortUrlService.updateShortUrl(state.name!, { url: state.url })
      : await ShortUrlService.createShortUrl({ name: state.name, url: state.url, userId });
    if (response.status !== 'ok') {
      console.error(response);
      // TODO: Error
      return;
    }

    setState({ name: '', url: '' });
    onSubmit && onSubmit();
  };

  const handleClose = () => {
    setState({ name: '', url: '' });
    onClose && onClose();
  };

  useEffect(() => {
    // Sync state with model prop when in edit mode and the model changes
    if (editMode && model) {
      setState({
        name: model?.slug ?? '',
        url: model?.originalUrl ?? '',
      });
    }
  }, [editMode, model]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {editMode
          ? 'Edit Short URL'
          : 'Create Short URL'
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 10 }}>
          When creating a short URL you can optionally specify a custom name
          to use as the slug. Otherwise a random one will be generated.
        </DialogContentText>
        <TextField
          fullWidth
          label="Slug Name (optional)"
          variant="outlined"
          value={state.name}
          onChange={e => setState({...state, name: e.target.value})}
          style={{
            marginBottom: 10,
          }}
        />
        <TextField
          error={!state.url}
          helperText={!state.url ? 'URL field is required.' : ''}
          fullWidth
          required
          multiline
          label="Enter URL"
          variant="outlined"
          value={state.url}
          onChange={e => setState({...state, url: e.target.value})}
        />
      </DialogContent>
      <DialogActions style={{ padding: '20px', paddingTop: '0px' }}>
        <Button
          title="Cancel"
          color="inherit"
          variant="contained"
          size="small"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          title={editMode ? "Save changes to short URL" : "Create short URL"}
          color="primary"
          variant="contained"
          size="small"
          onClick={handleSubmit}
        >
          {editMode
            ? 'Save'
            : 'Create'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};