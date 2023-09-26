import { clear, get, set } from '../../modules';

export const getUserToken = () => get('user');
  
export const setUserToken = (data: any) => set('user', data);
  
export const clearUserToken = () => clear('user');