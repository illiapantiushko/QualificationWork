import React, { useState, useEffect } from 'react';
import { AddNewUser, AddNewUserFromExel } from '../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select } from 'antd';

const EditeUser = (props) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    props.handleEditUser();
  };

  const Intitial = {
    userName: props.data?.name,
    userEmail: props.data?.email,
    age: props.data?.age,
  };

  const onFinish = (data) => {
    form.resetFields();
    props.handleEditUser();
  };

  return (
    <div>
      <Modal
        title="Edite User"
        visible={props.visible}
        onCancel={handleCancel}
        onOk={props.handleEditUser}
        width={350}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}>
        <Form
          initialValues={Intitial}
          form={form}
          id="myForm"
          name="basic"
          onFinish={onFinish}
          autoComplete="off">
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

let mapDispatchToProps = (dispatch) => {
  return {
    AddNewUser: (data) => {
      dispatch(AddNewUser(data));
    },
    AddNewUserFromExel: (file) => {
      dispatch(AddNewUserFromExel(file));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditeUser);
