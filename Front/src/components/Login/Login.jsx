import React from 'react';
import GoogleLogin from 'react-google-login';
import { Row, Col } from 'antd';
import '../Login/Login.scss';
import { connect } from 'react-redux';
import { setUserData } from './../../Api/actions';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const responseGoogle = (res) => {
    props.SetUserData(res.tokenId);
    console.log(res);

    navigate('/');
  };

  return (
    <div>
      <Row className="login-wraper" gutter={[16, 16]} justify="center" align="middle">
        <Col className="login-сontent" span={6}>
          <img className="logo" src="/images/logo.png" alt="Logo" />
          <GoogleLogin
            clientId="83091282364-d1ckabm35sr7p8lgl5marstr2r5sgia7.apps.googleusercontent.com"
            buttonText="Вхід через пошту @oa.edu.ua"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="google"
          />
        </Col>
      </Row>
    </div>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    SetUserData: (data) => {
      dispatch(setUserData(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
