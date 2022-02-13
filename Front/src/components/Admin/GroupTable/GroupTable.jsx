import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGroups, deleteGroupData } from '../../../Api/actionsAdmin';
import { Table, Tag, Typography, Row, Col, Pagination, Input, Popover, Popconfirm } from 'antd';
import AddGroup from './AddGroup';
import { DeleteOutlined, EllipsisOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
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

  const columns = [
    {
      title: 'Name group',
      dataIndex: 'name',
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
    },
    {
      title: 'Action',
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
                  <p className="item__optional__menu">
                    Delete
                    <DeleteOutlined />
                  </p>
                </Popconfirm>
                <p
                  onClick={() => setModalAddSubject({ groupId: record.id, visible: true })}
                  className="item__optional__menu">
                  Add Subjects
                </p>
                <p
                  onClick={() => setModalAddUser({ groupId: record.id, visible: true })}
                  className="item__optional__menu">
                  Add Users
                </p>
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
          <Search placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <Table
        loading={props.isFetching}
        dataSource={props.groups}
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.userGroups),
          rowExpandable: (record) => record.userGroups.length,
        }}
      />
      <div className="pagination__container mt-4 mb-4">
        <Pagination
          className="pagination"
          current={currentPage}
          pageSize={4}
          total={props.groupsTotalCount}
          onChange={(e) => setCurrentPage(e)}
        />
      </div>
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
