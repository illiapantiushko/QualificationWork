import React from 'react';
import { connect } from 'react-redux';
import { addLesson, getSubjectReport } from '../../Api/actionsTeacher';
import { Button } from 'antd';
import { Row, Col, Form, DatePicker, InputNumber } from 'antd';
import './teacherPanel.scss';
import { DownloadOutlined } from '@ant-design/icons';
const AddLesonForm = (props) => {
  const [form] = Form.useForm();

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
      <Row>
        <Col span={10}>
          <Form className="addLeson__form" form={form} id="myForm" name="basic" onFinish={onFinish}>
            <Row justify="center">
              <Col span={8}>
                <Form.Item name="lessonNumber" rules={[{ required: true }]}>
                  <InputNumber placeholder="Leson Number" className="addLeson__input" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="date" rules={[{ required: true }]}>
                  <DatePicker className="addLeson__input" />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Button type="primary" key="submit" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={5}>
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
