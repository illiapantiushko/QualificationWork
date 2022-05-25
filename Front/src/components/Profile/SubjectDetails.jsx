import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSubjectDetails } from '../../Api/actionProfile';
import { Table, Tag, Layout, Card, Button } from 'antd';
import { useParams, Link } from 'react-router-dom';


const { Content } = Layout;
const SubjectDetails = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.GetSubjectDetails(id);
  }, []);

  const columns = [
    {
      title: 'Номер заняття',
      dataIndex: 'lessonNumber',
      key: 'lessonNumber',
      align: 'center',
    },
    {
      title: 'Присутність',
      dataIndex: 'isPresent',
      key: 'isPresent',
      align: 'center',
      render: (record) => (
        <span>
          <Tag color={!record ? 'volcano' : 'green'}>{!record ? 'Не присутній' : 'Присутній'}</Tag>
        </span>
      ),
    },
    {
      title: 'Бал',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
    },
    {
      title: 'Дата заняття',
      dataIndex: 'lessonDate',
      key: 'lessonDate',
      align: 'center',
      render: (record) => <span>{new Date(record).toLocaleString('uk-UA')}</span>,
    },
  ];

  return (
    <Content 
    className="site-layout-background"
    style={{padding: 30, minHeight: 280, }}>
      <Card
        extra={ <Link to={"/"}>Назад</Link>}
        title={props.subject.subjectName}>
      <Table dataSource={props.subject.timeTables} bordered pagination={false} columns={columns} />
      </Card>
    </Content>
  );
};

let mapStateToProps = (state) => {
  return {
    subject: state.ProfilePage.subjectDetails,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjectDetails: (id) => {
      dispatch(getSubjectDetails(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetails);
