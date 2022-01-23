import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetGroups } from '../../../Api/actionsAdmin';
import { Table, Tag, Typography } from 'antd';
import AddGroup from './AddGroup';

const { Title } = Typography;
const GroupTable = (props) => {
  useEffect(() => {
    props.GetGroups();
  }, []);
  console.log(props.groups);

  const columns = [
    {
      title: 'Name group',
      dataIndex: 'name',
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
    },

    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   sorter: false,
    // },
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
      <AddGroup />
      <Table
        dataSource={props.groups}
        pagination={false}
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
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetGroups: () => {
      dispatch(GetGroups());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTable);
