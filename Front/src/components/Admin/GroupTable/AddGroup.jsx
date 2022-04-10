import React, { useState, useEffect } from 'react';
import { createNewGroup } from '../../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select} from 'antd';

const AddGroup = (props) => {
  const [usersData, setUsersData] = useState(null);
  const [subjectsData, setSubjectsData] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = (data) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteKey = (arr) => {
    arr.map((item) => delete item.key);
    return arr;
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (data) => {
  
    props.createNewGroup(data);
    form.resetFields();
    setIsModalVisible(false);
  };

  const UserColumns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <a>{text}</a>,
    }
  ];

  const SubjectColumns = [
    {
      title: 'Subject Name',
      dataIndex: 'subjectName',
      render: (text) => <a>{text}</a>,
    },
  ];

  const rowUserSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setUsersData(selectedRows);
    },
  };

  const rowSubjectSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSubjectsData(selectedRows);
    },
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ margin: 5 }}>
        Add new Group
      </Button>
      <Modal
        title="Add Group"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Create
          </Button>,
        ]}>
        <Form form={form} id="myForm" name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name="nameGroup" rules={[{ required: true }]}>
            <Input placeholder="Назва групи" />
          </Form.Item>
          <Form.Item name="nameFaculty" rules={[{ required: true }]}>
            <Select placeholder="Факультет">
              <Select.Option value="Economic">Економіка</Select.Option>
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    createNewGroup: (data) => {
      dispatch(createNewGroup(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddGroup);
