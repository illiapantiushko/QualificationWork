import React from 'react';
import SubjectTable from './SubjectTable';
import { Layout } from 'antd';


const { Content } = Layout;
const TeacherPanel = (props) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 30,
        minHeight: 280,
      }}>
      <SubjectTable subjects={props.subjects} />
    </Content>
  );
};

export default TeacherPanel;
