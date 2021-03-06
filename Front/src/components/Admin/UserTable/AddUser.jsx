import React, { useState } from 'react';
import { addNewUser, addNewUserFromExel } from '../../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Modal, Form, Button, Checkbox, Input, Select,  message } from 'antd';


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

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  const onFinish = (data) => {
    props.AddNewUser(data);
    form.resetFields();
    setIsModalVisible(false);
  };

  // const UploadProps = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       let file = new FormData();
  //       file.append('file', info.fileList[0].originFileObj);
  //       props.AddNewUserFromExel(file);
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ margin: 5 }}>
        Додати користувача
      </Button>
      <Modal
        title="Додати користувача"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={400}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}>
        <Form form={form} id="myForm" name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item name="userName" rules={[{ required:true,message: "Ім'я обов'язкове поле"  }]}>
            <Input placeholder="Ім'я" />
          </Form.Item>
          <Form.Item name="userEmail" rules={[{ required: true,message: "Пошта обов'язкове поле" }]}>
            <Input placeholder="Пошта" />
          </Form.Item>
          <Form.Item name="age" rules={[{ required: true,message: "Вік обов'язкове поле" }]}>
            <Input placeholder="Вік" />
          </Form.Item>
          <Form.Item name="isContract" rules={[{ required: true,message: "Позиція обов'язкове поле" }]}>
            <Select placeholder="Позиція">
              <Select.Option value={true}>Платник</Select.Option>
              <Select.Option value={false}>Державник</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="roles" rules={[{ required: true,message: "Ролі обов'язкове поле" }]}>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Checkbox value="Admin">Адмін</Checkbox>
              <Checkbox value="Student">Струдент</Checkbox>
              <Checkbox value="Teacher">Викладач</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddNewUser: (data) => {
      dispatch(addNewUser(data));
    },
    AddNewUserFromExel: (file) => {
      dispatch(addNewUserFromExel(file));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
