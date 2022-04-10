import React, { useState, useEffect } from 'react';
import { editeUser } from '../../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select, Checkbox } from 'antd';

const EditeUser = (props) => {
  const [form] = Form.useForm();

  console.log(props);

    const intitial = {
      userName: props.data?.userName,
      userEmail: props.data?.email,
      age: props.data?.age,
      іsContract: props.data?.іsContract,
      roles: props.data?.userRoles,
    };



  function handleCancel() {
    props.handleEditUser();
    form.resetFields();
  }

  
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const onFinish = (data) => {
    data.id = props.data?.id;
    props.editeUser(data); 
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
        width={400}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Edite
          </Button>,
        ]}>
        <Form
          initialValues={intitial}
          form={form}
          id="myForm"
          name="basic"
          onFinish={onFinish}
          >
          <Form.Item name="userName">
            <Input placeholder="Name" value={props.data?.userName} />
          </Form.Item>
          <Form.Item name="userEmail" value={props.data?.email}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="age">
            <Input placeholder="Age" />
          </Form.Item>
          <Form.Item name="іsContract">
            <Select placeholder="Position">
              <Select.Option value={true}>Платник</Select.Option>
              <Select.Option value={false}>Державник</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="roles" rules={[{ required: true }]}>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Checkbox value="Admin">Admin</Checkbox>
              <Checkbox value="Student">Student</Checkbox>
              <Checkbox value="Teacher">Teacher</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    editeUser: (data) => {
      dispatch(editeUser(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditeUser);
