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
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
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
    setUserData({...data});
    !modalEditeUser ? setModalEditeUser(true) : setModalEditeUser(false);
  };

  const fetchRecords = (page) => {
    setCurrentPage(page);
    props.GetUsers(currentPage, search);
  };

  const columns = [
    {
      title: 'Зображення',
      dataIndex: 'profilePicture',
      sorter: false,
      align: 'center',
      render: (text) => (
       
        <Avatar
          style={{ marginLeft: 8 }}
          src={
            !text
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnSi-Gltn2w68Fn37i4rPk5IAW5xv9Xehwww&usqp=CAU'
              : text
          }
        />
      ),
    },

    {
      title: "Ім'я",
      dataIndex: 'userName',
      sorter: false,
    },
    {
      title: 'Пошта',
      dataIndex: 'email',
      sorter: false,
    },
    {
      title: 'Вік',
      dataIndex: 'age',
      sorter: false,
      align: 'center',
    },
    {
      title: 'Ролі',
      dataIndex: 'userRoles',
      align: 'center',
      render: (text, record) =>
        !record.userRoles.length ? (
          <span>Without roles</span>
        ) : (
          <Popover
            content={text?.map((role) => (
              <tr>
                <td> {role}</td>
              </tr>
            ))}
            trigger="hover">
            Hover me
          </Popover>
        ),
      key: 'userRoles',
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: (record) => (
        <span>
          <a href="#" className="icon" onClick={() => handleEditUser(record)}>
            <EditOutlined />
          </a>
          <span> </span>
          <Popconfirm title="Ви впевнені що хочете видалити?" onConfirm={() => props.DeleteUser(record.id)}>
            <a href="#" className="icon delete">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const expandedRowRender = (timeTables) => {
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
      { title: 'Кількість кредитів', dataIndex: 'amountCredits', key: 'amountCredits',align:'center' },
      {
        title: 'Дата закінчення курсу',
        dataIndex: 'subjectСlosingDate',
        key: 'subjectСlosingDate',
      },
    ];
    const data = [];

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for (let i = 0; i < timeTables.length; ++i) {
      data.push({
        key: i,
        subjectName: timeTables[i].subject.subjectName,
        isActive: !timeTables[i].subject.isActive ? 'Не активний' : 'Активний',
        amountCredits: timeTables[i].subject.amountCredits,
        subjectСlosingDate: new Date(timeTables[i].subject.subjectСlosingDate).toLocaleString(
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
      <Row align="middle" className="header__table">
        <Col span={20}>
          <AddUser />
        </Col>
        <Col span={4}>
          <Search placeholder="Пошук..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <Table
        loading={props.isFetching}
        dataSource={props.users}
        bordered
        pagination={{
          pageSize: 4,
          total: props.usersTotalCount,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}
        scroll={{ x: 1200 }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.timeTables),
          rowExpandable: (record) => record.timeTables?.length,
        }}
      />
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
