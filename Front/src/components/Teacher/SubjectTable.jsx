import React, { useEffect } from 'react';
import { Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSubjects } from '../../Api/actionsTeacher';

const { Title } = Typography;

const SubjectTable = (props) => {
  useEffect(() => {
    props.GetSubjects();
  }, []);

  const { subjects } = props;

  const expandedRowRender = (timeTables) => {
    const columns = [
      { title: 'UserName', dataIndex: 'userName', key: 'userName' },
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
    for (let i = 0; i < timeTables.length; ++i) {
      data.push({
        key: i,
        userName: timeTables[i].user.userName,
        email: timeTables[i].user.email,
        position: !timeTables[i].user.іsContract ? 'Платник' : 'Бюджетник',
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
      render: (text, record) => (
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
      render: (record) => <span>{new Date(record).toLocaleString('uk-UA')}</span>,
    },
  ];

  return (
    <div className="wraper">
      <Title level={4}>Список предметів</Title>

      <Table
        loading={props.isFetching}
        dataSource={subjects}
        bordered
        pagination={false}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.timeTables),
          rowExpandable: (record) => record.timeTables?.length,
        }}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    subjects: state.TeacherPage.subjects,
    isFetching: state.TeacherPage.isFetchingSubjects,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(getSubjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectTable);
