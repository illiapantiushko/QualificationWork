import React, { useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
import AdminPanel from './components/Admin/AdminPanel';
import AdminPrivateRoute from './Utils/AdminPrivateRoute.route';
import TeacherPrivateRoute from './Utils/TeacherPrivateRoute.route';
import TeacherPanel from './components/Teacher/TeacherPanel';
import TableSubjectLessons from './components/Teacher/TableSubjectLessons';
import SubjectDetails from './components/Profile/SubjectDetails';
import { Layout } from 'antd';
import NavBar from './components/Layout/NavBar';
import SideBar from './components/Layout/SideBar';
import Main from './components/Profile/Main';
const { Footer } = Layout;

const App = () => {
  const [state, setState] = useState({
    collapsed: true,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const location = useLocation();
  const checkLocation = location.pathname === '/login';

  const roles = JSON.parse(localStorage.getItem('roles'));
  //  useSelector((state) => state.Auth.roles);
  return (
    <>
      <Layout>
        {checkLocation ? null : <NavBar state={state} toggle={toggle}></NavBar>}
        <Layout style={{ backgroundColor: '#fff' }}>
          {checkLocation ? null : <SideBar state={state}></SideBar>}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />

            <Route path="/subjectDetails/:id" element={<SubjectDetails />} />

            <Route
              path="/teacher"
              element={
                <TeacherPrivateRoute roles={roles}>
                  <TeacherPanel />
                </TeacherPrivateRoute>
              }
            />

            <Route
              path="/AttendanceSubject/:id"
              element={
                <TeacherPrivateRoute roles={roles}>
                  <TableSubjectLessons />
                </TeacherPrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminPrivateRoute roles={roles}>
                  <AdminPanel />
                </AdminPrivateRoute>
              }
            />
          </Routes>
        </Layout>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: '#0d0f1a;',
          }}>
          ©2022 Створено студентами Нау ОА
        </Footer>
      </Layout>
    </>
  );
};

export default App;
