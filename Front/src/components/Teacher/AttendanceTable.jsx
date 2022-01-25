import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Switch } from 'antd';
import { connect } from 'react-redux';
import { getAttendanceList, setNewUserScore, setNewUserIsPresent } from '../../Api/actionsTeacher';
import { EditableRow, EditableCell } from './EditableCell';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AttendanceTable = (props) => {
  useEffect(() => {
    props.GetAttendanceList(props.subjectId, props.namberleson);
  }, [props.subjectId, props.namberleson]);

  const handleSwitch = (e, id) => {
    props.SetNewUserIsPresent(id, e);
  };
  const columns = [
    { title: 'User Name', dataIndex: 'userName', key: 'userName' },
    {
      title: 'IsPresent',
      dataIndex: 'isPresent',
      key: 'isPresent',
      align: 'center',
      render: (e, record) => <Switch checked={e} onChange={(e) => handleSwitch(e, record.id)} />,
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
    SetNewUserScore: (row) => {
      dispatch(setNewUserScore(row));
    },
    SetNewUserIsPresent: (id, isPresent) => {
      dispatch(setNewUserIsPresent(id, isPresent));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
