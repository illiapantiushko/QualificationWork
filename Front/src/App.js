import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { useSelector } from 'react-redux';
import AdminPanel from './components/Admin/AdminPanel';
import AdminPrivateRoute from './Utils/AdminPrivateRoute.route';
import TeacherPrivateRoute from './Utils/TeacherPrivateRoute.route';
import TeacherPanel from './components/Teacher/TeacherPanel';

const App = () => {
  const roles = useSelector((state) => state.Auth.roles);
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />

          <Route
            path="/teacher"
            element={
              <TeacherPrivateRoute roles={roles}>
                <TeacherPanel />
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
    </div>
  );
};

export default App;
