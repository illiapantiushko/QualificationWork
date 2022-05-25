import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Switch } from 'antd';
import { connect } from 'react-redux';
import { getAttendanceList, setNewUserScore, setNewUserIsPresent } from '../../Api/actionsTeacher';
import { EditableRow, EditableCell } from './EditableCell';

const { Title } = Typography;

const AttendanceTable = (props) => {
  useEffect(() => {
    props.GetAttendanceList(props.subjectId, props.namberleson);
  }, [props.subjectId, props.namberleson]);

  const handleSwitch = (e, id) => {
    props.SetNewUserIsPresent(id, e, props.namberleson);
  };
  const columns = [
    { title: "Ім`я", dataIndex: 'userName', key: 'userName' },
    {
      title: 'Присутність',
      dataIndex: 'isPresent',
      key: 'isPresent',
      align: 'center',
      render: (e, record) => <Switch checked={e} onChange={(e) => handleSwitch(e, record.id)} />,
    },
    {
      title: 'Бал',
      dataIndex: 'score',
      key: 'score',
      with: 200,
      align: 'center',
      editable: true,
    },
  ];

  const handleSave = (row) => {
    props.SetNewUserScore(row, props.namberleson);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Title level={4}>Таблиця відвідуваності заняття №{props.namberleson}</Title>

      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        pagination={false}
        dataSource={props.attendanceList}
        columns={mergedColumns}
      />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    attendanceList: state.TeacherPage.attendanceList,
    isFetching: state.TeacherPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetAttendanceList: (id, namberleson) => {
      dispatch(getAttendanceList(id, namberleson));
    },
    SetNewUserScore: (row, lessonNumber) => {
      dispatch(setNewUserScore(row, lessonNumber));
    },
    SetNewUserIsPresent: (id, isPresent, lessonNumber) => {
      dispatch(setNewUserIsPresent(id, isPresent, lessonNumber));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
