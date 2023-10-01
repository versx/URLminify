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
  elevation?: number;
};

export const StatTile = (props: StatTileProps) => {
  const { title, value, color = 'primary.main', elevation = 3 } = props;
  return (
    <Card elevation={elevation}>
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