import { http } from '../modules';

const resetApiKey = async (userId: number) => {
  const response = await http
    .post(`users/${userId}/key/reset`);
  return response.data;
};

export const UserService = {
  resetApiKey,
};