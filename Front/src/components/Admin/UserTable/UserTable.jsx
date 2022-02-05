import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Popover,
  Popconfirm,
  Typography,
  Avatar,
  Input,
  Row,
  Col,
  Pagination,
} from 'antd';
import './userTable.scss';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getUsers, deleteUserData, deleteRole } from '../../../Api/actionsAdmin';
import EditeUser from './EditeUser';
import AddUser from './AddUser';

const { Title } = Typography;
const { Search } = Input;

const UserTable = (props) => {
  const [search, setSearch] = useState(' ');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.GetUsers(currentPage, search);
  }, [search, currentPage]);

  const [modalEditeUser, setModalEditeUser] = useState(false);

  const [userData, setUserData] = useState(null);

  const handleEditUser = (data) => {
    setUserData(data);
    !modalEditeUser ? setModalEditeUser(true) : setModalEditeUser(false);
  };

  const deleteRole = (id, role) => {
    props.deleteRole({ id, role });
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'profilePicture',
      sorter: false,
      align: 'center',
      render: (text) => (
        <Avatar
          style={{ marginLeft: 8 }}
          src={
            !text
              ? 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-11.png'
              : text
          }
        />
      ),
    },

    {
      title: 'Name',
      dataIndex: 'userName',
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
      render: (text, record) =>
        !record.userRoles.length ? (
          <span>Without roles</span>
        ) : (
          <Popover
            content={text?.map((user) => (
              <tr>
                <td> {user.role.name}</td>
                <td>
                  <a
                    href="#"
                    className="icon delete"
                    onClick={() => deleteRole(record.id, user.role)}>
                    <DeleteOutlined />
                  </a>
                </td>
              </tr>
            ))}
            trigger="hover">
            Hover me
          </Popover>
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
          <Popconfirm title="Sure to delete?" onConfirm={() => props.DeleteUser(record.id)}>
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
      <Title level={4}>Список користувачів</Title>
      <Row align="middle">
        <Col span={20}>
          <AddUser />
        </Col>
        <Col span={4}>
          <Search placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <Table
        loading={props.isFetching}
        dataSource={props.users}
        bordered
        scroll={{ x: 1200 }}
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userSubjects),
          rowExpandable: (record) => record.userSubjects?.length,
        }}
      />
      <div className="pagination__container mt-4 mb-4">
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={4}
          total={props.usersTotalCount}
          onChange={(e) => setCurrentPage(e)}
        />
      </div>
      <EditeUser data={userData} visible={modalEditeUser} handleEditUser={handleEditUser} />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    users: state.AdminPage.users,
    usersTotalCount: state.AdminPage.usersTotalCount,
    isFetching: state.AdminPage.isFetchingUsers,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetUsers: (pageNumber, search) => {
      dispatch(getUsers(pageNumber, search));
    },
    DeleteUser: (id) => {
      dispatch(deleteUserData(id));
    },
    deleteRole: (data) => {
      dispatch(deleteRole(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
