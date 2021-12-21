import React, { useState } from 'react';
import { AddNewUser } from '../../Api/actions';
import { connect } from 'react-redux';

import { Modal, Form, Button, Input, Select } from 'antd';

const AddUser = (props) => {
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

  const onFinish = (data) => {
    props.AddNewUser(data);

    form.resetFields();
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ margin: 16 }}>
        Add User
      </Button>
      <Modal
        title="Add User"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={350}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}>
        <Form form={form} id="myForm" name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name="userName">
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="userEmail">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="age">
            <Input placeholder="Age" />
          </Form.Item>
          <Form.Item name="isContract">
            <Select placeholder="Position">
              <Select.Option value={true}>Платник</Select.Option>
              <Select.Option value={false}>Державник</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// let mapStateToProps = (state) => {
//   return {
//     users: state.AdminPage.users,
//     groups: state.AdminPage.groups,
//   };
// };

let mapDispatchToProps = (dispatch) => {
  return {
    AddNewUser: (data) => {
      dispatch(AddNewUser(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
