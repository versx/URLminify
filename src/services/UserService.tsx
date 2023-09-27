import { http } from '../modules';

const resetApiKey = async (userId: number) => {
  const response = await http()
    .post(`users/${userId}/key/reset`);
  return response.data;
};

const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
  const response = await http()
    .post(`users/${userId}/password/reset`, { oldPassword, newPassword });
  return response.data;
};

const deleteAccount = async (userId: number) => {
  const response = await http()
    .delete(`users/${userId}`);
  return response.data;
};

export const UserService = {
  resetApiKey,
  changePassword,
  deleteAccount,
};