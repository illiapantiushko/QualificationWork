import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSubjectLesons, removeLesson } from '../../Api/actionsTeacher';
import { Table, Popconfirm, Popover, Layout, Card } from 'antd';
import AttendanceTable from './AttendanceTable';
import AddLesonForm from './AddLesonForm';
import { DeleteOutlined, EllipsisOutlined, InsertRowBelowOutlined } from '@ant-design/icons';

const { Content } = Layout;

const TableSubjectLessons = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.GetSubjectLesons(id);
  }, []);

  const [balTable, setBalTable] = useState({ visible: false, namberleson: null });

  const deleteLesson = (lessonNumber) => {
    props.removeLesson(lessonNumber, id);
  };

  const columns = [
    {
      title: 'Номер заняття',
      dataIndex: 'lessonNumber',
      key: ' lessonNumber',
      align: 'center',
    },
    {
      title: 'Дата заняття',
      dataIndex: 'lessonDate',
      key: 'lessonDate',
      align: 'center',
      render: (record) => <span>{new Date(record).toLocaleString('uk-UA')}</span>,
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
                  onConfirm={() => deleteLesson(record.lessonNumber)}>
                  <p className="item__optional__menu">
                    Delete
                    <DeleteOutlined />
                  </p>
                </Popconfirm>
                <p
                  className="item__optional__menu"
                  onClick={() => setBalTable({ visible: true, namberleson: record.lessonNumber })}>
                  Show <InsertRowBelowOutlined />
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

  return (
    <Content
      className="site-layout-background"
      style={{padding: 30, minHeight: 280, }}>
      <Card
        title={props.subjectLesons.subjectName}
        bodyStyle={{
          padding: 10,
        }}
        headStyle={{
          fontWeight: '600',
          fontSize: '18px',
          backgroundColor: 'rgb(202 227 224 / 13%)',
        }}
        className="card__wrapper">
        <AddLesonForm subjetId={id} />
        <Table dataSource={props.subjectLesons.lessons} bordered pagination={false} columns={columns} />
      </Card>
      {!balTable.visible ? null : (
        <AttendanceTable subjectId={id} namberleson={balTable.namberleson} />
      )}
    </Content>
  );
};

let mapStateToProps = (state) => {
  return {
    subjectLesons: state.TeacherPage.subjectLesons,
    isFetching: state.TeacherPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjectLesons: (id) => {
      dispatch(getSubjectLesons(id));
    },
    removeLesson: (lessonNumber, subjectId) => {
      dispatch(removeLesson(lessonNumber, subjectId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSubjectLessons);
