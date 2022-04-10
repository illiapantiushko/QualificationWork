import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
const { Sider } = Layout;
const SideBar = ({ state }) => {
  const roles = JSON.parse(localStorage.getItem('roles'));

  return (
    <Sider  trigger={null} theme="dark" collapsible collapsed={state.collapsed}>
      <Menu  theme="dark" mode="inline" defaultSelectedKeys={['2']}>
      {roles.includes('Student')?
        <Menu.Item key="1" icon={<UserOutlined />}>
          <NavLink to="/">Profile</NavLink>
        </Menu.Item>
        :null
        }
        {roles.includes('Admin')?
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <NavLink to="/admin">Admin panel</NavLink>
      </Menu.Item>
        :null
        }
         {roles.includes('Teacher')?
      <Menu.Item key="3" icon={<UploadOutlined />}>
      <NavLink to="/teacher">Teacher panel</NavLink>
    </Menu.Item>
        :null
        }
      </Menu>
    </Sider>
  );
};

export default SideBar;
