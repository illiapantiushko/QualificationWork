import React from 'react';
import GroupTable from './GroupTable/GroupTable';
import './adminPanel.scss';
import UserTable from './UserTable/UserTable';

const AdminPanel = (props) => {
  return (
    <div className="wraper">
      <UserTable isFetching={props.isFetching} deleteUserRole={props.deleteUserRole} />
      <GroupTable
        refreshUsers={props.GetUsers}
        refreshGroups={props.GetGroups}
        isFetching={props.isFetching}
        groups={props.groups}
      />
    </div>
  );
};

export default AdminPanel;
