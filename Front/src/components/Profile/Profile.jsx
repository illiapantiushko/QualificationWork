import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetSubjects } from '../../Api/actionProfile';
import { Table, Tag } from 'antd';
const Profile = (props) => {
  useEffect(() => {
    props.GetSubjects();
  }, []);

  const columns = [
    { title: 'Назва предмету', dataIndex: 'subjectName', key: 'subjectName' },
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
      title: 'Кількість кредитів',
      dataIndex: 'subjectСlosingDate',
      key: 'subjectСlosingDate',
    },
  ];

  return (
    <div className="wraper">
      <h1>Мої предмети</h1>
      <Table dataSource={props.subjects} bordered pagination={false} columns={columns} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    subjects: state.ProfilePage.subjects,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(GetSubjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
