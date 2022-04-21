import logo from "../Images/logo2.png"
import "../Css/Login.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUsers, loginUsers, clearUser } from "../redux/actions/Loginregister"
import Swal from "sweetalert2"

function Login() {
  const { registerUser, loginUser } = useSelector(store => store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validation, setValidation] = useState(true)
  const [signUp, setSignUp] = useState(false)
  const [SigInUp, setSignInUp] = useState({
    login: false,
    register: false
  })
  const [state, setState] = useState({
    email: "",
    password: "",
    user: ""
  })

  const [error, setError] = useState({
    email: false,
    password: false,
    user: signUp
  })

  useEffect(() => {

    if (signUp) {
      if (!error.email && !error.password && !error.user && state.email && state.password && state.user) {
        setValidation(false)
      }
      else {
        setValidation(true)
      }
    }
    else {
      if (!error.email && !error.password && state.email && state.password) {
        setValidation(false)
      }
      else {
        setValidation(true)
      }
    }

    return ()=> dispatch(clearUser())
  }, [error, state])

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/home")
    }
    else {
      if (loginUser.error) {
        setSignInUp({
          ...SigInUp,
          login: true
        })
        setValidation(true)
      }
      else if (loginUser.token) {
        window.localStorage.setItem("token", loginUser.token)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully logged-in',
          showConfirmButton: false,
          timer: 1200
        })
        if(loginUser.admin){
          navigate("/home/admin/dashboard")
        }
        else{
          navigate("/home")
        }
      }
      else if (registerUser.status) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You have successfully registered Now Login',
          showConfirmButton: false,
          timer: 1800
        })
        handleSignUp()
      }
      else if (registerUser.status === false) {
        setSignInUp({
          ...SigInUp,
          register: true
        })
        setState({
          email: "",
          password: "",
          user: ""
        })
      }
    }
  }, [registerUser, loginUser])

  const handleSignUp = () => {
    signUp ? setSignUp(false) : setSignUp(true)
    setState({
      email: "",
      password: "",
      user: ""
    })
    setError({
      email: false,
      password: false,
      user: signUp
    })
    setValidation(true)
  }

  const handleValidationInputs = (e) => {
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const value = e.target.value
    const name = e.target.name

    switch (name) {
      case "user":
        setState({
          ...state,
          [name]: value
        })
        if (value.trim().length > 4) {
          setError({
            ...error,
            [name]: false
          })
        }
        else {
          setError({
            ...error,
            [name]: true
          })
        }
        break
      case "password":
        setState({
          ...state,
          [name]: value
        })
        if (value.length > 4) {
          setError({
            ...error,
            [name]: false
          })
        }
        else {
          setError({
            ...error,
            [name]: true
          })
        }
        break;

      case "email":
        setState({
          ...state,
          [name]: value.trim()
        })
        if (regexEmail.test(value.trim())) {
          setError({
            ...error,
            [name]: false
          })
        }
        else {
          setError({
            ...error,
            [name]: true
          })
        }
        break
      default:
        break
    }
  }

  const hanldeSubmit = (e) => {
    e.preventDefault()
    if (e.nativeEvent.submitter.name === "login") {
      dispatch(loginUsers({
        email: state.email,
        password: state.password,
      }))
    }
    else if (e.nativeEvent.submitter.name === "signUp") {
      dispatch(registerUsers({
        email: state.email,
        password: state.password,
        userName: state.user.trim()
      }))
    }
  }
  console.log(loginUser)
  console.log(registerUser)
  return (
    <div className="container d-flex justify-content-center" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>

      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">

        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>

        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <img src={logo} alt="logo" width="50" />
          </div>
          <h2 className="fw-bold text-center pt-3 mb-5">Welcome</h2>

          <form onSubmit={hanldeSubmit}>
            {signUp
              ? (
                <div className="mb-4">
                  <div className="row">
                    <label htmlFor="user" className="col form-label">User name:</label>
                    {error.user
                      ? <label htmlFor="user" className="col form-label text-warning fw-bold text-end">Invalid User Name</label>
                      : null
                    }
                  </div>
                  <input type="text" value={state.user} autoFocus name="user" className="form-control" onChange={handleValidationInputs}
                  />
                </div>
              )
              : null
            }
            <div className="mb-4">
              <div className="row">
                <label htmlFor="email" className="col form-label">Email:</label>
                {error.email
                  ? <label htmlFor="email" className="col form-label text-warning fw-bold text-end">Invalid Email</label>
                  : null
                }
              </div>
              <input type="email" value={state.email} name="email" autoFocus className="form-control" onChange={handleValidationInputs}
              />
            </div>
            <div className="mb-5">
              <div className="row">
                <label htmlFor="password" className="col form-label">Password:</label>
                {error.password
                  ? <label htmlFor="email" className="col form-label text-warning fw-bold text-end">Invalid Password</label>
                  : null
                }
              </div>
              <input type="password" name="password" value={state.password} className="form-control" onChange={handleValidationInputs}
              />
            </div>

            <div className="mb-5">
              {signUp
                ? SigInUp.register
                  ? <label htmlFor="register" className="col form-label text-warning fw-bold text-start">This email already exists, please put another email or login</label>
                  : null
                : SigInUp.login
                  ? <label htmlFor="login" className="col form-label text-warning fw-bold text-end">Invalid email or password</label>
                  : null
              }
            </div>
            <div className="d-grid">
              {signUp
                ? <button type="submit" className="btn btn-primary" name="signUp" disabled={validation}>Sign Up</button>
                : <button type="submit" className="btn btn-primary" name="login" disabled={validation}>Login</button>
              }

            </div>
            <div className="mt-4">
              {!signUp
                ? <span>You do not have an account? <button onClick={handleSignUp}
                  className="bg-transparent border-0 mb-3 text-primary text-decoration-underline">Sign up</button></span>
                : <span>You have an account? <button onClick={handleSignUp}
                  className="bg-transparent border-0 text-primary text-decoration-underline">Login</button></span>
              }

              <br />
              {!signUp
                ? <span>Forgot your password? <button className="bg-transparent border-0 text-primary text-decoration-underline">Recover password</button></span>
                : null
              }
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Login;