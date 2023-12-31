import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { IOSSwitch } from '../components';
import { formatDateForDateTimeInput } from '../modules';
import { ShortUrlService } from '../services';
import { getUserToken } from '../stores';
import { ShortUrl } from '../types';

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
  expiry: Date | string;
  enabled: boolean;
};

export const CreateShortUrlDialog = (props: CreateShortUrlDialogProps) => {
  const { open, editMode = false, model, onSubmit, onClose } = props;

  const [state, setState] = useState<CreateShortUrlDialogState>({
    name: editMode ? model?.slug ?? '' : '',
    url: editMode ? model?.originalUrl ?? '' : '',
    expiry: editMode ? model?.expiry ?? '' : '',
    enabled: editMode ? model?.enabled ?? true : true,
  });
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleSubmit = async () => {
    if (!state.url) {
      enqueueSnackbar('URL field is required!', { variant: 'error' });
      return;
    }

    const expiry = state.expiry === '' ? null : new Date(state.expiry!);
    const payload = { url: state.url, expiry, enabled: state.enabled };
    const response = editMode
      ? await ShortUrlService.updateShortUrl(state.name!, payload)
      : await ShortUrlService.createShortUrl({ ...payload, name: state.name, userId: currentUser?.id });
    if (response.status !== 'ok') {
      enqueueSnackbar(`Failed to ${editMode ? 'update' : 'create'} short URL with error: ${response.error}`, { variant: 'error' });
      return;
    }

    setState({ name: '', url: '', expiry: '', enabled: true });
    onSubmit && onSubmit();
  };

  const handleClose = () => {
    setState({ name: '', url: '', expiry: '', enabled: true });
    onClose && onClose();
  };

  useEffect(() => {
    // Sync state with model prop when in edit mode and the model changes
    if (editMode && model) {
      setState({
        name: model?.slug ?? '',
        url: model?.originalUrl ?? '',
        expiry: model?.expiry ?? '',
        enabled: model?.enabled ?? true,
      });
    }
  }, [editMode, model]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle align="center">
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
          style={{
            marginBottom: 10,
          }}
        />
        <TextField
          fullWidth
          label="Expiry Date (optional)"
          type="datetime-local"
          value={state.expiry ? formatDateForDateTimeInput(new Date(state.expiry)) : ''}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => setState({...state, expiry: e.target.value ? new Date(e.target.value) : ''})}
          style={{
            marginBottom: 10,
          }}
        />        
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} checked={state.enabled} onChange={(e => setState({...state, enabled: e.target.checked }))} />}
          label="Enabled"
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