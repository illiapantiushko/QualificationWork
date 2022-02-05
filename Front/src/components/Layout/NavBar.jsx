import React from 'react';
import { Layout, Button, PageHeader } from 'antd';
import { connect } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
const { Header } = Layout;
const NavBar = ({ state, toggle, profile }) => {
  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <PageHeader
          className="site-page-header"
          title={profile?.userName}
          avatar={{
            src: profile?.profilePicture,
          }}
          extra={[
            <Button key="1" className="header-button">
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
    // AddNewUser: (data) => {
    //   dispatch(addNewUser(data));
    // },
    // AddNewUserFromExel: (file) => {
    //   dispatch(addNewUserFromExel(file));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
