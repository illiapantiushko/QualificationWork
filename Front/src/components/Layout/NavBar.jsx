import React, { useEffect } from 'react';
import { Layout, Button, PageHeader } from 'antd';
import { connect } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { getInfoCurrentUser } from '../../Api/actionProfile';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
const { Header } = Layout;
const NavBar = ({ state, toggle, profile, GetInfoCurrentUser }) => {
  const location = useLocation();
  const checkLocation = location.pathname === '/login';
  const roles = useSelector((state) => state.Auth.roles);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    GetInfoCurrentUser();
  }, []);

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <PageHeader
          className="site-page-header"
          title={profile?.userName}
          avatar={{
            src: profile?.profilePicture,
            shape: 'square',
          }}
          extra={[
            <Button onClick={logout} key="1" className="header-button">
              Вийти
            </Button>,
          ]}
          tags={
            <div>
              {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger triger-header',
                onClick: toggle,
              })}
            </div>
          }></PageHeader>
      </Header>
    </Layout>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetInfoCurrentUser: () => {
      dispatch(getInfoCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
