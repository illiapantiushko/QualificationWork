import React, { useEffect } from 'react';
import { Layout, Row, Card } from 'antd';
import CardSubject from './CardSubject';
import SubjectDone from './SubjectDone';
import TableSubject from './TableSubject';
import { connect } from 'react-redux';

import { getSubjects, getUserReport } from '../../Api/actionProfile';

const { Content } = Layout;
const Main = (props) => {
  useEffect(() => {
    props.GetSubjects();
  }, []);

  console.log(props.subjects);

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 30,
        minHeight: 280,
      }}>
      <Card
        loading={props.isFetchingSubjects}
        title={props.profile?.specialty}
        bodyStyle={{
          padding: 10,
        }}
        headStyle={{
          fontWeight: '600',
          fontSize: '18px',
          backgroundColor: 'rgb(202 227 224 / 13%)',
        }}
        className="card__wrapper">
        {props.subjects.map((e) => (
          <CardSubject profile={props.profile} data={e} />
        ))}
      </Card>
      <TableSubject
        isFetching={props.isFetchingSubjects}
        getUserReport={props.getUserReport}
        subjects={props.subjects}
      />
    </Content>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
    subjects: state.ProfilePage.subjects,
    isFetchingSubjects: state.ProfilePage.isFetchingSubjects,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(getSubjects());
    },
    getUserReport: () => {
      dispatch(getUserReport());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
