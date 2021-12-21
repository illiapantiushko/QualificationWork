import React from 'react';
import { Navigate } from 'react-router-dom';

const StudentPrivateRoute = ({ children, roles }) => {
  const checkRole = roles.includes('Student');
  return checkRole ? children : <Navigate to="/login" />;
};

export default StudentPrivateRoute;
