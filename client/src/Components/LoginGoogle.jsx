import React from 'react';
import { GoogleLogin } from 'react-google-login';

function LoginGoogle() {

  const onSuccess = (response) => {
    console.log(response);
  }

  const onFailure = (response) => {
    console.log(response);
  }

  return (
    <div className='mt-2'>
      <GoogleLogin
        clientId="931352466233-7mhmtsa47dv0p2bpi59fsaakomg8fng0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginGoogle;
