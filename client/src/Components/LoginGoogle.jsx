import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { loginGoogle } from "../redux/actions/Loginregister"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

function LoginGoogle() {
  const dispatch = useDispatch()

  const onSuccess = (response) => dispatch(loginGoogle({
    email: response.profileObj.email,
    username: response.profileObj.name
  }))

  const onFailure = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }

  return (
    <div className='mt-2'>
      <GoogleLogin
        clientId="931352466233-7mhmtsa47dv0p2bpi59fsaakomg8fng0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={false}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginGoogle;
