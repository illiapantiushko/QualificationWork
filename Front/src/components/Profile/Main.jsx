import React, { useEffect } from 'react';
import { Layout, Row, Card } from 'antd';
import CardSubject from './CardSubject';
import SubjectDone from './SubjectDone';
import TableSubject from './TableSubject';
import { connect } from 'react-redux';

import { getSubjects, getInfoCurrentUser, getUserReport } from '../../Api/actionProfile';

const { Content } = Layout;
const Main = (props) => {
  useEffect(() => {
    props.GetInfoCurrentUser();
    props.GetSubjects();
  }, []);

  // console.log(props.subjects);

  // const data = [
  //   { title: 'Англійська мова за професійним спрямуванням' },
  //   { title: 'Дослідження операцій' },
  //   { title: 'Маркетинг' },
  //   { title: 'Прогнозування соціально-економічних процесів' },
  //   { title: 'Проектування та розробка інформаційних систем' },
  //   { title: 'Методи та системи штучного інтелекту' },
  // ];
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 30,
        minHeight: 280,
      }}>
      <Card
        title="КН-41"
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
      <TableSubject getUserReport={props.getUserReport} subjects={props.subjects} />
    </Content>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.ProfilePage.profile,
    subjects: state.ProfilePage.subjects,
    isFetchingSubjects: state.ProfilePage.isFetchingSubjects,
    isFetching: state.ProfilePage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(getSubjects());
    },
    GetInfoCurrentUser: () => {
      dispatch(getInfoCurrentUser());
    },
    getUserReport: () => {
      dispatch(getUserReport());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
