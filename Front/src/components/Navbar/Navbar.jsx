import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const checkLocation = location.pathname === '/login';
  const roles = useSelector((state) => state.Auth.roles);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      {checkLocation ? null : (
        <div>
          <Menu mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <NavLink to="/">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              <NavLink to="/admin">Admin panel</NavLink>
            </Menu.Item>

            <Menu.Item key="alipay" icon={<TableOutlined />}>
              <NavLink to="/teacher">Teacher panel</NavLink>
            </Menu.Item>

            {!roles ? (
              <Menu.Item key="login">
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            ) : (
              <Menu.Item key=" LogOut" onClick={logout}>
                Logout
              </Menu.Item>
            )}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
