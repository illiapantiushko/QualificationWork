import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addLesson, getSubjectReport } from '../../Api/actionsTeacher';
import { Button } from 'antd';
import { Row, Col, Form, DatePicker, InputNumber,Modal } from 'antd';
import './teacherPanel.scss';

const AddLesonForm = (props) => {

  const [form] = Form.useForm();

  const [showModal, setShowModal]=useState(false);

  const handleModal = () => {
    !showModal ?setShowModal(true):setShowModal(false);
  }

  const onFinish = (data) => {
    data.subjectId = Number(props.subjetId);
    data.date = new Date(data.date).toISOString();
    props.AddLesson(data);
    form.resetFields();
  };
  const downloadReport = () => {
    props.getSubjectReport(props.subjetId);
  };
  return (
    <div className="wraper addLeson_wraper">
      
      <Modal
        title="Нове заняття"
        visible={showModal}
        onCancel={handleModal}
        onOk={handleModal}
        footer={[
          <Button form="myForm" type="primary" key="submit" htmlType="submit">
            Create
          </Button>,
        ]}>
       <Form className="addLeson__form" form={form} id="myForm" name="basic" onFinish={onFinish}>
              <Row justify='center' >
              <Col span={20} >
                <Form.Item name="lessonNumber" rules={[{ required: true }]}>
                  <InputNumber placeholder="Номер заняття" className="addLeson__input" />
                </Form.Item>
                <Form.Item name="date" rules={[{ required: true }]}>
                  <DatePicker placeholder="Дата" className="addLeson__input" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
      </Modal>
      
      
      <Row gutter={[16, 16]} justify="end" >
      <Col>
      <Button onClick={handleModal} type="primary">
            Додати нове заннятя
      </Button>          
        </Col>
        <Col>
          <Button onClick={downloadReport} type="primary">
            Сформувати звіт за предметом
          </Button>
        </Col>
      </Row>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddLesson: (data) => {
      dispatch(addLesson(data));
    },
    getSubjectReport: (subjectId) => {
      dispatch(getSubjectReport(subjectId));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddLesonForm);
