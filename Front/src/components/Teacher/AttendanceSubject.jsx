import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { GetSubjectLesons } from '../../Api/actionsTeacher';
import { Table, Button, Typography } from 'antd';
import AttendanceTable from './AttendanceTable';

const { Title } = Typography;

const AttendanceSubject = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.GetSubjectLesons(id);
  }, []);

  const [balTable, setBalTable] = useState({ visible: false, namberleson: 2 });

  const columns = [
    {
      title: 'Номер заняття',
      dataIndex: 'lessonNumber',
      key: ' lessonNumber',
      align: 'center',
      render: (record) => (
        <span onClick={() => setBalTable({ visible: true, namberleson: record })}>{record}</span>
      ),
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
      <Title level={4}> Table subject lesons: Компютерні мережі</Title>
      <Table dataSource={props.subjectLesons} bordered pagination={false} columns={columns} />

      <Button onClick={() => setBalTable({ visible: false, namberleson: null })}>
        Close Table
      </Button>
      {!balTable.visible ? null : (
        <AttendanceTable subjectid={id} namberleson={balTable.namberleson} />
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
      dispatch(GetSubjectLesons(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceSubject);
