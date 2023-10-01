import {
  Box,
  Typography,
} from '@mui/material';

interface QuotaRemainingProps {
  used: number;
  total?: number;
};

export const QuotaRemaining = (props: QuotaRemainingProps) => {
  const { used, total = 0 } = props;
  const remaining = total - used;
  const available = `${remaining.toLocaleString()}/${total.toLocaleString()}`;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="end"
      //padding="1rem"
      //border="1px solid #ccc"
      borderRadius="5px"
    >
      <Typography variant="subtitle1">
        Remaining: {available}
      </Typography>
    </Box>
  );
};