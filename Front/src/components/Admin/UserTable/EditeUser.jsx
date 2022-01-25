import React from 'react';
import { editeUser } from '../../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Modal, Form, Button, Input, Select } from 'antd';

const EditeUser = (props) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    props.handleEditUser();
  };

  const Intitial = {
    userName: props.data?.userName,
    userEmail: props.data?.email,
    age: props.data?.age,
    іsContract: props.data?.іsContract,
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
          <Form.Item name="іsContract">
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
    editeUser: (data) => {
      dispatch(editeUser(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditeUser);
