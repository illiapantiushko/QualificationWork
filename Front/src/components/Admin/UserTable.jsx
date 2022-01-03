import React, { useState } from 'react';
import { Table, Tag, Popover, Popconfirm, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EditeUser from './EditeUser';

const { Title } = Typography;

const UserTable = ({ users, isFetching, DeleteUser }) => {
  const [modalEditeUser, setModalEditeUser] = useState(false);
  const [row, setRow] = useState({});

  const handleEditUser = (row) => {
    setRow(row);
    !modalEditeUser ? setModalEditeUser(true) : setModalEditeUser(false);
  };

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
            content={userRoles?.map((userRoles) => (
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
          <a href="#" className="icon" onClick={() => handleEditUser(record)}>
            <EditOutlined />
          </a>
          <span> </span>
          <Popconfirm title="Sure to delete?" onConfirm={() => DeleteUser(record.id)}>
            <a href="#" className="icon delete">
              <DeleteOutlined />
            </a>
          </Popconfirm>
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
      <Title level={4}>User table with subject</Title>
      <Table
        loading={isFetching}
        dataSource={users}
        bordered
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userSubjects),
          rowExpandable: (record) => record.userSubjects?.length,
        }}
      />

      <EditeUser data={row} visible={modalEditeUser} handleEditUser={handleEditUser} />
    </div>
  );
};

export default UserTable;
