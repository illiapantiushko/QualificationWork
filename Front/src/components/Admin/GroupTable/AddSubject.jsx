import React, { useState, useEffect } from 'react';
import { addUserSubject } from '../../../Api/actionsAdmin';
import { instance } from '../../../Api/api';
import { connect } from 'react-redux';
import { Modal, Form, Button, Table, Pagination } from 'antd';

const AddSubject = (props) => {
  const [subjectsData, setSubjectsData] = useState(null);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  async function getUsers(page) {
    const res = await instance.get(
      `Teachers/getAllSubjests?pageNumber=${page}&pageSize=${4}&search=${''}`,
    );
    setSubjectsData(
      res.data.data.map((row) => ({
        id: row.id,
        key: row.id,
        subjectName: row.subjectName,
        isActive: row.isActive,
        amountCredits: row.amountCredits,
        subjectСlosingDate: row.subjectСlosingDate,
      })),
    );
    setCount(res.data.totalCount);
  }

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const [form] = Form.useForm();

  const handleOk = () => {
    props.setModalAddUser(false);
  };

  const handleCancel = () => {
    props.setModalAddUser(false);
  };

  const deleteKey = (arr) => {
    arr.map((item) => delete item.key);
    return arr;
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = () => {
    const data = {
      groupId: props.groupId,
      arrUserId: selectedRowKeys,
    };

    props.addUserSubject(data);
    form.resetFields();
    props.setModalAddUser(false);
  };

  const columns = [
    {
      title: 'Назва предмету',
      dataIndex: 'subjectName',
      key: 'userName',
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    <div>
      <Modal
        title="Додати предмети до групи"
        visible={props.visible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Add
          </Button>,
        ]}>
        <Form form={form} id="myForm" name="basic" onFinish={onFinish} autoComplete="off">
          <Table
            style={{ margin: 5 }}
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={subjectsData}
            pagination={false}
          />
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={4}
            total={count}
            onChange={(e) => setCurrentPage(e)}
          />
        </Form>
      </Modal>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    addUserSubject: (data) => {
      dispatch(addUserSubject(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddSubject);
