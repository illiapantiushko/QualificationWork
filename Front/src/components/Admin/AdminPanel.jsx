import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetGroups } from '../../Api/actionsAdmin';
import GroupTable from './GroupTable/GroupTable';
import './adminPanel.scss';
import UserTable from './UserTable/UserTable';
import { deleteUserRole } from './../../Redux/Admin-reducer';

const AdminPanel = (props) => {
  useEffect(() => {
    props.GetGroups();
  }, []);

  return (
    <div className="wraper">
      <UserTable
        isFetching={props.isFetching}
        deleteUserRole={props.deleteUserRole}
      />
      <GroupTable
        refreshUsers={props.GetUsers}
        refreshGroups={props.GetGroups}
        isFetching={props.isFetching}
        groups={props.groups}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    groups: state.AdminPage.groups,
    isFetching: state.AdminPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetGroups: () => {
      dispatch(GetGroups());
    },
    deleteUserRole: (row) => {
      dispatch(deleteUserRole(row));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
