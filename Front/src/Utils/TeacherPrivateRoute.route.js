import React from 'react';
import { Navigate } from 'react-router-dom';

const TeacherPrivateRoute = ({ children, roles }) => {
  const checkRole = roles.includes('Teacher');
  return checkRole ? children : <Navigate to="/login" />;
};

export default TeacherPrivateRoute;
