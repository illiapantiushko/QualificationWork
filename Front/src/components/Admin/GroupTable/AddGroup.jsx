import React, { useState, useEffect } from 'react';
import { createNewGroup } from '../../../Api/actionsAdmin';
import { connect } from 'react-redux';
import { Typography, Modal, Form, Button, Input, Select, Table, Row, Col } from 'antd';

const { Title } = Typography;

const AddGroup = (props) => {
  const [usersData, setUsersData] = useState(null);
  const [subjectsData, setSubjectsData] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    // setUsersData(getUserList(1));
    // props.GetListSubjects();
  }, []);

  console.log(usersData);

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
    // const group = {
    //   nameGroup: data.groupName,
    //   nameFaculty: data.faculty,
    //   users: deleteKey(usersData),
    //   subjects: deleteKey(subjectsData),
    // };
    console.log(data);

    // props.createGroup(group);
    // props.GetUsers(1, '');
    // props.GetGroups();
    // setSelectedRowKeys([]);

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
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    // },
  ];

  const SubjectColumns = [
    {
      title: 'Subject Name',
      dataIndex: 'subjectName',
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    // },
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
            <Input placeholder="Name group" />
          </Form.Item>
          <Form.Item name="nameFaculty" rules={[{ required: true }]}>
            <Select placeholder="Факультет">
              <Select.Option value="Economic">Економіка</Select.Option>
            </Select>
          </Form.Item>

          {/* <Row>
            <Col xs={22} sm={22} md={22} lg={12} xl={12}>
              <Title level={5}>List Users</Title>
              <Table
                style={{ margin: 5 }}
                bordered
                rowSelection={rowSelection}
                columns={UserColumns}
                dataSource={usersData.data.}
                pagination={false}
              />
            </Col>
            <Col xs={22} sm={22} md={22} lg={12} xl={12}>
              <Title level={5}>List Subject</Title>
              <Table
                style={{ margin: 5 }}
                bordered
                rowSelection={{
                  ...rowSubjectSelection,
                }}
                columns={SubjectColumns}
                dataSource={props.listSubject}
                pagination={false}
              />
            </Col>
          </Row> */}
        </Form>
      </Modal>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    // listUsers: state.AdminPage.users,
    // listSubject: state.AdminPage.subjects,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    createNewGroup: (data) => {
      dispatch(createNewGroup(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
