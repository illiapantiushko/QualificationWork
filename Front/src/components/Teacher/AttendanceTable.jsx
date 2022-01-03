import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Switch } from 'antd';
import { connect } from 'react-redux';
import { GetAttendanceList, SetNewUserScore, SetNewUserIsPresent } from '../../Api/actionsTeacher';
import { EditableRow, EditableCell } from './EditableCell';

const { Title } = Typography;

const AttendanceTable = (props) => {
  useEffect(() => {
    props.GetAttendanceList(props.subjectid, props.namberleson);
  }, [props.subjectid, props.namberleson]);

  const handleSwitch = (e, id) => {
    props.SetNewUserIsPresent(id, e.isPresent);
  };

  const columns = [
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    {
      title: 'IsPresent',
      dataIndex: 'isPresent',
      key: 'isPresent',
      align: 'center',
      render: (e, record) => (
        <Switch defaultChecked={e} onChange={(e) => handleSwitch(e, record.id)} />
      ),
    },
    {
      title: 'Bal',
      dataIndex: 'score',
      key: 'score',
      with: 200,
      align: 'center',
      editable: true,
    },
  ];

  const handleSave = (row) => {
    props.SetNewUserScore(row);
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
      <Title level={4}>Таблиця выдвідуваносі № {props.namberleson}</Title>

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
      dispatch(GetAttendanceList(id, namberleson));
    },
    SetNewUserScore: (row) => {
      dispatch(SetNewUserScore(row));
    },
    SetNewUserIsPresent: (id, isPresent) => {
      dispatch(SetNewUserIsPresent(id, isPresent));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
