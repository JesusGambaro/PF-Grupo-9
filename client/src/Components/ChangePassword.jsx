import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeForgottenPassword, clearPassword } from "../redux/actions/changeOfPassword"
import logo from "../Images/logo2.png"
import "../Css/Login.css"
import Swal from "sweetalert2"

function ChangePassword() {
  const dispatch = useDispatch()
  const { changePasswort } = useSelector(store => store.root)
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState(false)

  useEffect(() => {
    if (!error && !errorConfirmPassword && password.length > 0 && password === confirmPassword) {
      setValidation(false)
    }
    else {
      setValidation(true)
    }
  }, [password, error, confirmPassword])

  useEffect(() => {
    return () => dispatch(clearPassword())
  }, [])

  useEffect(() => {
    if (changePasswort.status) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Password changed successfully,\n Now login !',
        showConfirmButton: false,
        timer: 2000
      })
      navigate("/home/login")
    }
    else if (changePasswort.status === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You don't have access to this area!",
        showConfirmButton: false,
        timer: 2500
      })
      navigate("/home/login")
    }
  }, [changePasswort])


  const handleValidationPassword = (e) => {
    const regexPass = /^(?=\w*[a-z])\S{5,15}$/
    const value = e.target.value
    const name = e.target.name
    if (name === "password") {
      setPassword(value)
      regexPass.test(value) ? setError(false) : setError(true)
    }
    else if (name === "confirmPassword") {
      setConfirmPassword(value)
      value === password ? setErrorConfirmPassword(false) : setErrorConfirmPassword(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changeForgottenPassword(password,token))
    setLoading(true)
  }

  return (
    <div className="container d-flex justify-content-center" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>

      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">

        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>

        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <img src={logo} alt="logo" width="50" />
          </div>
          <h2 className="fw-bold text-center pt-3 mb-5">Write your new password</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <label htmlFor="changeP" className="col form-label">New Password:</label>
              {error
                ? <label htmlFor="changeP" className="col form-label text-danger fw-bold text-end">Invalid Password</label>
                : null
              }
            </div>
            <input type="password" value={password} autoFocus name="password" className="form-control" onChange={handleValidationPassword}
            />

            <div className="row mt-4">
              <label htmlFor="confirmPassword" className="col form-label">Confirm your password:</label>
              {errorConfirmPassword
                ? <label htmlFor="confirmPassword" className="col form-label text-danger fw-bold text-end">Passwords don't match</label>
                : null
              }
            </div>
            <input type="password" value={confirmPassword} name="confirmPassword" className="form-control" onChange={handleValidationPassword}
            />

            <label htmlFor="register" className="col form-label text-black-50 fw-bold text-start mt-4">The password must have a minimum of 5 characters and a maximum of 15 characters and at least one lowercase.</label>

            <div className="mt-3 d-grid" >
              <button type="submit" className="btn btn-primary" name="validation" disabled={validation}>
                {loading
                  ? <span className="spinner-border text-info" role="status"></span>
                  : "Change Password"
                }
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>

  );
}

export default ChangePassword;