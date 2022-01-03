import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { useSelector } from 'react-redux';
import AdminPanel from './components/Admin/AdminPanel';
import AdminPrivateRoute from './Utils/AdminPrivateRoute.route';
import TeacherPrivateRoute from './Utils/TeacherPrivateRoute.route';
import TeacherPanel from './components/Teacher/TeacherPanel';
import AttendanceSubject from './components/Teacher/AttendanceSubject';

const App = () => {
  const roles = useSelector((state) => state.Auth.roles);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Profile />} />

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
              <AttendanceSubject />
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
    </div>
  );
};

export default App;
