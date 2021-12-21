import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetSubjects } from '../../Api/actions';
import { Table, Tag } from 'antd';

const TeacherPanel = (props) => {
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    props.GetSubjects();
  };

  const expandedRowRender = (userSubjects) => {
    const columns = [
      { title: 'UserName', dataIndex: 'userName', key: 'name' },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        render: (record) => (
          <span>
            <Tag color={record === 'Платник' ? 'volcano' : 'green'} key={record.isActive}>
              {record}
            </Tag>
          </span>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < userSubjects.length; ++i) {
      data.push({
        key: i,
        userName: userSubjects[i].user.userName,
        email: userSubjects[i].user.email,
        position: !userSubjects[i].user.іsContract ? 'Платник' : 'Бюджетник',
      });
    }
    return <Table rowKey={Math.random()} columns={columns} dataSource={data} pagination={false} />;
  };

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const columns = [
    { title: 'Назва', dataIndex: 'subjectName', key: 'name' },
    {
      title: 'Активний',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (record) => (
        <span>
          <Tag color={record === 'Не активний' ? 'volcano' : 'green'}>{record}</Tag>
        </span>
      ),
    },
    { title: 'Кількість кредитів', dataIndex: 'amountCredits', key: 'amountCredits' },
    {
      title: 'Дата закінчення курсу',
      dataIndex: 'subjectСlosingDate',
      key: 'subjectСlosingDate',
      render: (record) => <span>{new Date(record).toLocaleString('uk-UA', options)}</span>,
    },
  ];

  return (
    <div className="wraper">
      <h1>TeacherPanel!</h1>
      <h3>My subject</h3>

      <Table
        loading={props.isFetching}
        dataSource={props.subjects}
        bordered
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userSubjects),
          rowExpandable: (record) => record.userSubjects.length,
        }}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    subjects: state.TeacherPage.subjects,
    isFetching: state.TeacherPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(GetSubjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPanel);
