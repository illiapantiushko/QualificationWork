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
  console.log(props.subjectLesons);

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
      title: '',
      key: 'operation',
      align: 'center',
      render: (text, record) => (
        <>
          <Popover
            content={
              <div>
                <Popconfirm
                  title="Ви впевнені що хочете видалити?"
                  onConfirm={() => deleteLesson(record.lessonNumber)}>
                  <p className="item__optional__menu">
                    Видалити
                    <DeleteOutlined />
                  </p>
                </Popconfirm>
                <p
                  className="item__optional__menu"
                  onClick={() => setBalTable({ visible: true, namberleson: record.lessonNumber })}>
                  Відкрити <InsertRowBelowOutlined />
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
        title={props. subjectName}
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
        <Table dataSource={props.subjectLesons} bordered pagination={false} columns={columns} />
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
    subjectName:state.TeacherPage.subjectName,
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
