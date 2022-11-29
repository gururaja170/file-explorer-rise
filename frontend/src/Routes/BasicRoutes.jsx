import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/AuthenticationPages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SignUpPage from '../pages/AuthenticationPages/SignUpPage/SignUpPage';
import ShareFiles from '../pages/ShareFilesPage/ShareFiles';

const BasicRoutes = ({ loginProps }) => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute {...loginProps} />}>
        <Route index element={<HomePage {...loginProps} />} />
        <Route path='/share/:id' element={<ShareFiles {...loginProps} />} />
        <Route
          path='/admin'
          element={<HomePage {...loginProps} isAdministrator />}
        />
      </Route>

      <Route path='/signup' element={<SignUpPage {...loginProps} />} />
      <Route path='/login' element={<LoginPage {...loginProps} />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default BasicRoutes;
