import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGroups } from '../../../Api/actionsAdmin';
import { Table, Tag, Typography, Row, Col, Pagination, Input } from 'antd';
import AddGroup from './AddGroup';

const { Title } = Typography;
const { Search } = Input;

const GroupTable = (props) => {
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
      <Row align="middle">
        <Col span={19}>
          <AddGroup />
        </Col>
        <Col span={4}>
          <Search placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
      </Row>
      <Table
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
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetGroups: (pageNumber, search) => {
      dispatch(getGroups(pageNumber, search));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTable);
