import React from 'react';
import { Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const SubjectTable = (props) => {
  const { subjects } = props;

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
    {
      title: 'Назва',
      dataIndex: 'subjectName',
      key: 'name',
      render: (text, record, index) => (
        <span>
          <Link to={`/AttendanceSubject/${record.id}`}>{text}</Link>
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
      <Title level={4}>List Subject with user</Title>

      <Table
        dataSource={subjects}
        bordered
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userSubjects),
          rowExpandable: (record) => record.userSubjects?.length,
        }}
      />
    </div>
  );
};

export default SubjectTable;
