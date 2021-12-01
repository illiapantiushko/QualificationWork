import React from 'react'
import GoogleLogin from 'react-google-login';

const Login=()=> {
    
    
    const responseGoogle = (response) => {
        console.log(response);
      }

    return (
        <div>
    <GoogleLogin
    clientId="83091282364-d1ckabm35sr7p8lgl5marstr2r5sgia7.apps.googleusercontent.com"
    buttonText="Вхід через пошту @oa.edu.ua"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    className="google"
    // cookiePolicy={'single_host_origin'}
  />
        </div>
    )
}


export default Login;