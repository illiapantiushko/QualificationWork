import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, TableOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Navbar = () => {
  const location = useLocation();
  const checkLocation = location.pathname === '/login';

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

            <Menu.Item key="login">
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
