import React from "react";
import {GoogleLogin} from "react-google-login";
import {loginGoogle} from "../redux/actions/Loginregister";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

function LoginGoogle() {
  const dispatch = useDispatch();

  const onSuccess = (response) =>
    dispatch(
      loginGoogle({
        email: response.profileObj.email,
        username: response.profileObj.name,
      })
    );

  const onFailure = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We couldn't login!",
    });
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        clientId={process.env.REACT_APP_KEYGOOGLE}
        disabled={false}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme={"dark"}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginGoogle;
