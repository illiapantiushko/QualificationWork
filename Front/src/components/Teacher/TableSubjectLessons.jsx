import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSubjectLesons, removeLesson } from '../../Api/actionsTeacher';
import { Table, Button, Typography, Popconfirm } from 'antd';
import AttendanceTable from './AttendanceTable';
import AddLesonForm from './AddLesonForm';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

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
      render: (record) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setBalTable({ visible: true, namberleson: record })}>
          {record}
        </span>
      ),
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
      render: (record) => (
        <span>
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteLesson(record.lessonNumber)}>
            <a href="#" className="icon delete">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="wraper">
      <Title level={4}> Компютерні мережі</Title>
      <AddLesonForm subjetId={id} />
      <Table dataSource={props.subjectLesons} bordered pagination={false} columns={columns} />
      {!balTable.visible ? null : (
        <AttendanceTable subjectId={id} namberleson={balTable.namberleson} />
      )}
    </div>
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
