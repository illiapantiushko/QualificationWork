import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetUsers, GetGroups, DeleteUser } from '../../Api/actions';
import AddUser from './AddUser';
import GroupTable from './GroupTable';
import './admin.scss';
import UserTable from './UserTable';

const AdminPanel = (props) => {
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    props.GetUsers();
    props.GetGroups();
  };

  return (
    <div className="wraper">
      <AddUser />
      <UserTable isFetching={props.isFetching} users={props.users}  DeleteUser={props.DeleteUser} />
      <GroupTable isFetching={props.isFetching} groups={props.groups} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    users: state.AdminPage.users,
    groups: state.AdminPage.groups,
    isFetching: state.AdminPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetUsers: () => {
      dispatch(GetUsers());
    },
    GetGroups: () => {
      dispatch(GetGroups());
    },
    DeleteUser: (id) => {
      dispatch(DeleteUser(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
