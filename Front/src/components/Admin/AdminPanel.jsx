import React from 'react';
import GroupTable from './GroupTable/GroupTable';
import './adminPanel.scss';
import UserTable from './UserTable/UserTable';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminPanel = (props) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 30,
        minHeight: 280,
      }}>
      <UserTable isFetching={props.isFetching} deleteUserRole={props.deleteUserRole} />
      <GroupTable
        refreshUsers={props.GetUsers}
        refreshGroups={props.GetGroups}
        isFetching={props.isFetching}
        groups={props.groups}
      />
    </Content>
  );
};

export default AdminPanel;
