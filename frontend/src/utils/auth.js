import { localStorageKeys } from '../data/localStorageKeys';
import jwtDecode from 'jwt-decode';

export const login = (token) => {
  localStorage.setItem(localStorageKeys.token, token);
  window.location.reload();
};

export const logout = (token) => {
  localStorage.removeItem(localStorageKeys.token);
  window.location.reload();
};

export const getUser = () => {
  try {
    const token = localStorage.getItem(localStorageKeys.token);
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return false;
  }
};
