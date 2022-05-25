import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroups, deleteGroupData } from '../../../Api/actionsAdmin';
import { Table, Tag, Typography, Row, Col,  Input, Popover, Popconfirm} from 'antd';
import AddGroup from './AddGroup';
import {  EllipsisOutlined } from '@ant-design/icons';
import AddUser from './AddUser';
import AddSubject from './AddSubject';
const { Title } = Typography;
const { Search } = Input;

const GroupTable = (props) => {
  const [modalAddUser, setModalAddUser] = useState({ groupId: null, visible: false });
  const [modalAddSubject, setModalAddSubject] = useState({ groupId: null, visible: false });

  const [search, setSearch] = useState(' ');
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    props.GetGroups(currentPage, search);
  }, [currentPage, search]);


  const fetchRecords = (page) => {
    setCurrentPage(page);
    props.GetGroups(currentPage, search);
  };

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'name',
    },
    {
      title: 'Факультет',
      dataIndex: 'faculty',
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: (text, record) => (
        <>
          <Popover
            content={
              <div>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => props.DeleteGroupData(record.id)}>
                  <li className="item__optional__menu">
                    Видалити
                  </li>
                </Popconfirm>
                <li
                  onClick={() => setModalAddSubject({ groupId: record.id, visible: true })}
                  className="item__optional__menu">
                  Додати предмети
                </li>
                <li
                  onClick={() => setModalAddUser({ groupId: record.id, visible: true })}
                  className="item__optional__menu">
                 Додати користувачів
                </li>

                {/* <Link to={`/group/${record.id}`}>
                <li className="item__optional__menu">
                  Gro
                </li>
                </Link>
                 */}
              </div>

            }
            trigger="click">
            <EllipsisOutlined style={{ fontSize: '25px' }} />
          </Popover>
        </>
      ),
    },
  ];

  const expandedRowRender = (userGroups) => {
    const columns = [
      { title: "Ім'я", dataIndex: 'userName', key: 'name' },
      {
        title: 'Пошта',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Позиція',
        dataIndex: 'position',
        align:'center',
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
    for (let i = 0; i < userGroups.length; ++i) {
      data.push({
        key: i,
        userName: userGroups[i].user.userName,
        email: userGroups[i].user.email,
        position: !userGroups[i].user.іsContract ? 'Платник' : 'Бюджетник',
      });
    }
    return <Table rowKey={Math.random()} columns={columns} dataSource={data} pagination={false} />;
  };

  return (
    <div>
      <Title level={4}>Список груп</Title>
      <Row align="middle" className="header__table">
        <Col span={20}>
          <AddGroup />
          <AddUser
            groupId={modalAddUser.groupId}
            visible={modalAddUser.visible}
            setModalAddUser={setModalAddUser}
          />
          <AddSubject
            groupId={modalAddSubject.groupId}
            visible={modalAddSubject.visible}
            setModalAddUser={setModalAddSubject}
          />
        </Col>
        <Col span={4}>
          <Search placeholder="Пошук..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <Table
        loading={props.isFetching}
        dataSource={props.groups}
        pagination={{
          pageSize: 4,
          total: props.groupsTotalCount,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userGroups),
          rowExpandable: (record) => record.userGroups.length,
        }}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    groups: state.AdminPage.groups,
    groupsTotalCount: state.AdminPage.groupsTotalCount,
    isFetching: state.AdminPage.isFetchingGroups,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetGroups: (pageNumber, search) => {
      dispatch(getGroups(pageNumber, search));
    },
    DeleteGroupData: (id) => {
      dispatch(deleteGroupData(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTable);
