import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
} from '@mui/material';

export const ViewTelemetryDetailsDialog = (props: any) => {
  const { open, selectedRow, setOpen } = props;
  const selectedRowKeys = selectedRow ? Object.keys(selectedRow) : [];

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle align="center">
        Details for '{selectedRow?.slug}'
      </DialogTitle>
      <DialogContent>
        <Container component={Paper} elevation={3} sx={{p: 3}}>
          {selectedRowKeys.map((key: string) => (
            <Grid container key={key} spacing={0}>
              <Grid item xs={6}>
                <strong>{key}:</strong>
              </Grid>
              <Grid item xs={6}>
                {selectedRow[key]}
              </Grid>
            </Grid>
          ))}
        </Container>
      </DialogContent>
    </Dialog>
  );
};