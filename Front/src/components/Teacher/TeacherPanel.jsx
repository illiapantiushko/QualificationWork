import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSubjects } from '../../Api/actionsTeacher';
import SubjectTable from './SubjectTable';

const TeacherPanel = (props) => {
  useEffect(() => {
    props.GetSubjects();
  }, []);

  return (
    <div className="wraper">
      <SubjectTable subjects={props.subjects} />
      {/* <LineChart /> */}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    subjects: state.TeacherPage.subjects,
    isFetching: state.TeacherPage.isFetching,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    GetSubjects: () => {
      dispatch(getSubjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPanel);
