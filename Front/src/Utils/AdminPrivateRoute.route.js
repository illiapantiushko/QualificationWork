import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children, roles }) => {
  const checkRole = roles.includes('Admin');
  return checkRole ? children : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
