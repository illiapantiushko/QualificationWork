import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetSubjectDetails } from '../../Api/actionProfile';
import { Table, Tag, Typography, Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';

const { Title } = Typography;

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
    <div className="wraper">
      <Title level={4}>Таблиця відуваності</Title>
      <Table dataSource={props.subjectDetails} bordered pagination={false} columns={columns} />
      <Row align="middle">
        <Col xs={24} md={16}>
          <Card bordered={false} bodyStyle={{ padding: '0 20px 20px' }}>
            <LineChart />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} bodyStyle={{ padding: '0 20px 20px' }}>
            <DoughnutChart timeTable={props.subjectDetails} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    subjectDetails: state.ProfilePage.subjectDetails,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjectDetails: (id) => {
      dispatch(GetSubjectDetails(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetails);
