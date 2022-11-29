import React from 'react';
import { useLazyLoginUserQuery } from '../../../apiServices/authService';
import { loginFormData } from '../../../data/userFormData';
import AuthenticationPage from '../CommonPage/AuthenticationPage';
import { login } from './../../../utils/auth';

const LoginPage = ({ isLoggedIn }) => {
  const [loginUser, { error = {}, isError }] = useLazyLoginUserQuery();

  const doSubmit = async (loginForm) => {
    const { data } = await loginUser(loginForm);
    if (data) {
      login(data);
    }
  };

  return (
    <AuthenticationPage
      isLoggedIn={isLoggedIn}
      formData={loginFormData}
      doSubmit={doSubmit}
      redirectURL='/signup'
      redirectURLLabel='Create New Account'
      formLabel='Login'
      buttonLabel='Login'
      errorMsg={error.data}
      showErrorMsg={isError}
    />
  );
};

export default LoginPage;
