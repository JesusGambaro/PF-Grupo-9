import logo from "../Images/logo2.png"
import "../Css/Login.css"
import { useState, useEffect } from "react"

function Login() {
  const [signUp, setSignUp] = useState(false)
  const [state, setState] = useState({
    email: "",
    password: "",
    user: ""
  })
  const [validation, setValidation] = useState(true)
  const [error, setError] = useState({
    email: false,
    password: false,
    user: signUp
  })

  useEffect(() => {
   
    if(signUp){
      if(!error.email && !error.password && !error.user && state.email && state.password && state.user ){
        setValidation(false)
      }
      else{
        setValidation(true)
      }
    }
    else{
      if(!error.email && !error.password && state.email && state.password){
        setValidation(false)
      }
      else{
        setValidation(true)
      }
    }
  }, [error,state])

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
    const value=e.target.value
    const name=e.target.name

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

  return (
    <div className="container d-flex justify-content-center" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>

      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">

        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>

        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <img src={logo} alt="logo" width="50" />
          </div>
          <h2 className="fw-bold text-center pt-3 mb-5">Welcome</h2>

          <form onSubmit={(e) => e.preventDefault()}>
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
                  <input type="text" value={state.user}  autoFocus name="user" className="form-control" onChange={handleValidationInputs}
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

            <div className="d-grid">
              {signUp
                ? <button type="submit" className="btn btn-primary" id="signUp" disabled={validation}>Sign Up</button>
                : <button type="submit" className="btn btn-primary" id="login" disabled={validation}>Login</button>
              }

            </div>
            <div className="mt-4">
              {!signUp
                ? <span>You do not have an account? <button onClick={handleSignUp}
                  className="bg-transparent border-0 text-primary text-decoration-underline">Sign up</button></span>
                : <span>You have an account? <button onClick={handleSignUp}
                  className="bg-transparent border-0 text-primary text-decoration-underline">Login</button></span>
              }

              <br />
              {!signUp
                ? <span>Forgot your password? <button className="mt-3 bg-transparent border-0 text-primary text-decoration-underline">Recover password</button></span>
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