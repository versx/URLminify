import { http } from '../modules';

const register = (username: string, email: string, password: string) => {
  return http.post('auth/register', {
    username,
    email,
    password,
  });
};

const login = async (username: string, password: string) => {
  const response = await http
    .post('auth/login', {
      username,
      password,
    });
  //console.log('login response:', response);
  const data = response.data;
  //const user = data?.data?.user;
  //if (user) {
  //  setUserToken(user);
  //}
  return data;
};

const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};

export const AuthService = {
  register,
  login,
  logout,
};