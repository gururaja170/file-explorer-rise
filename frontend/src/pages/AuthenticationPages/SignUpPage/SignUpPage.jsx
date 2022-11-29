import React from 'react';
import Joi from 'joi';
import { singupFormData } from '../../../data/userFormData';

import AuthenticationPage from '../CommonPage/AuthenticationPage';
import { useLazyRegisterUserQuery } from '../../../apiServices/authService';
import { login } from '../../../utils/auth';

const userSchema = {
  username: Joi.string().required().label('Username'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().required().label('Password'),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .label('Confirm Password'),
  role: Joi.string().required().label('Role'),
};

const SignUpPage = ({ isLoggedIn }) => {
  const [registerUser, { error = {}, isError }] = useLazyRegisterUserQuery();
  const doSubmit = async (signupForm) => {
    // post details to server
    const { data } = await registerUser(signupForm);
    if (data) {
      login(data);
    }
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <AuthenticationPage
      isLoggedIn={isLoggedIn}
      doSubmit={doSubmit}
      formData={singupFormData}
      buttonLabel='Sign up'
      formLabel='Sign Up'
      redirectURL='/login'
      redirectURLLabel='Already have an account? Login Here'
      joiSchema={userSchema}
      onError={onError}
      errorMsg={error.data}
      showErrorMsg={isError}
    />
  );
};

export default SignUpPage;
