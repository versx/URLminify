import {
  Card,
  CardContent,
  Color,
  Typography,
} from '@mui/material';

interface StatTileProps {
  title: string;
  value: number;
  color: string[] | Color | undefined | any;
};

export const StatTile = (props: StatTileProps) => {
  const { title, value, color = 'textSecondary' } = props;
  return (
    <Card elevation={3}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h5" color={color} gutterBottom>
          {value}
        </Typography>
        <Typography variant="subtitle1">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};