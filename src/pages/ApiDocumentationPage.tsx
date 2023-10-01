import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { ApiRoutes } from '../consts';
import { RouteParamInfo } from '../types';

export const ApiDocumentationPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        API Documentation
      </Typography>
      {ApiRoutes.map((route, index) => (
        <Paper elevation={3} style={{ margin: '20px 0', padding: '20px' }} key={index}>
          <Typography variant="h6">
            {route.method} {route.path}
          </Typography>
          <Typography variant="body1">{route.description}</Typography>
          {route.parameters && (
            <>
              <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                Parameters:
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {route.parameters.map((param: RouteParamInfo, paramIndex: number) => (
                    <TableRow key={paramIndex}>
                      <TableCell>{param.name}</TableCell>
                      <TableCell>{param.type}</TableCell>
                      <TableCell>{param.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          {route.response && (
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
              Response: {route.response}
            </Typography>
          )}
        </Paper>
      ))}
    </Container>
  );
};