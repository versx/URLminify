import React, { useEffect, useState } from 'react';
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
import { useSnackbar } from 'notistack';

import { UserService } from '../../services';
import { getUserToken } from '../../stores';
import { User } from '../../types';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  useEffect(() => {
    if (!currentUser?.admin) {
      return;
    }
    UserService.getUsers().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar('Failed to get users.', { variant: 'error' });
        return;
      }
      setUsers(response.users);
    });
  }, [currentUser?.admin, enqueueSnackbar]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin - Users
      </Typography>

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell><strong>{user.username}</strong></TableCell>
                <TableCell>{user.enabled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.admin ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(user.createdAt!).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};