import React from 'react';
import { Table, Tag, Popover } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const UserTable = ({ users, isFetching, DeleteUser }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: false,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: false,
      align: 'center',
    },
    {
      title: 'Roles',
      dataIndex: 'userRoles',
      align: 'center',
      render: (userRoles) => (
        <div>
          <Popover
            content={userRoles.map((userRoles) => (
              <p>{userRoles.role.name}</p>
            ))}
            trigger="hover">
            Hover me
          </Popover>
        </div>
      ),
      key: 'userRoles',
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      render: (record) => (
        <span>
          <a href="#" className="icon">
            <EditOutlined />
          </a>
          <span> </span>
          <a href="#" className="icon delete" onClick={() => DeleteUser(record.id)}>
            <DeleteOutlined />
          </a>
        </span>
      ),
    },
  ];

  const expandedRowRender = (userSubjects) => {
    const columns = [
      { title: 'Назва', dataIndex: 'subjectName', key: 'name' },
      {
        title: 'Активний',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (record) => (
          <span>
            <Tag color={record === 'Не активний' ? 'volcano' : 'green'} key={record.isActive}>
              {record}
            </Tag>
          </span>
        ),
      },
      { title: 'Кількість кредитів', dataIndex: 'amountCredits', key: 'amountCredits' },
      {
        title: 'Дата закінчення курсу',
        dataIndex: 'subjectСlosingDate',
        key: 'subjectСlosingDate',
      },
    ];
    const data = [];

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for (let i = 0; i < userSubjects.length; ++i) {
      data.push({
        key: i,
        subjectName: userSubjects[i].subject.subjectName,
        isActive: !userSubjects[i].subject.isActive ? 'Не активний' : 'Активний',
        amountCredits: userSubjects[i].subject.amountCredits,
        subjectСlosingDate: new Date(userSubjects[i].subject.subjectСlosingDate).toLocaleString(
          'uk-UA',
          options,
        ),
      });
    }
    return <Table rowKey={Math.random()} columns={columns} dataSource={data} pagination={false} />;
  };

  return (
    <div>
      <h2>User Table</h2>
      <Table
        loading={isFetching}
        dataSource={users}
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

export default UserTable;
