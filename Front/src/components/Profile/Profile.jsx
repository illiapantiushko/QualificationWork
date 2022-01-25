import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSubjects, getInfoCurrentUser } from '../../Api/actionProfile';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './Profile.scss';
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
  useEffect(() => {
    props.GetInfoCurrentUser();
    props.GetSubjects();
  }, []);

  const columns = [
    {
      title: 'Назва предмету',
      dataIndex: 'subjectName',
      key: 'subjectName',
      render: (text, record) => (
        <span>
          <Link to={`/subjectDetails/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: 'Активний',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (record) => (
        <span>
          <Tag color={!record ? 'volcano' : 'green'}>{!record ? 'Не активний' : 'Активний'}</Tag>
        </span>
      ),
    },
    {
      title: 'Кількість кредитів',
      dataIndex: 'amountCredits',
      key: 'amountCredits',
    },
    {
      title: 'Дата закінчення курсу',
      dataIndex: 'subjectСlosingDate',
      key: 'subjectСlosingDate',
      render: (record) => <span>{new Date(record).toLocaleString('uk-UA')}</span>,
    },
  ];

  return (
    <div className="wraper">
      <ProfileInfo profile={props.profile} />
      <h1>My Subjects</h1>
      <Table
        loading={props.isFetching}
        dataSource={props.subjects}
        bordered
        pagination={false}
        columns={columns}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
    subjects: state.ProfilePage.subjects,
    isFetching: state.ProfilePage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(getSubjects());
    },
    GetInfoCurrentUser: () => {
      dispatch(getInfoCurrentUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
