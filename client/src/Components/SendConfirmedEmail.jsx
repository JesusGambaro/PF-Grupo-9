import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { forgottenPassword, clearPassword } from "../redux/actions/changeOfPassword"
import Swal from "sweetalert2"

function SendConfirmedEmail({ signIn, register }) {
  const { changePasswort } = useSelector(store => store.root)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState(false)
  const [errorSendEmail, setErrorSendEmail] = useState(false)

  useEffect(() => {
    if (!error && email) {
      setValidation(false)
    }
    else {
      setValidation(true)
    }
  }, [email, error])

  useEffect(() => {
    return () => dispatch(clearPassword())
  }, [])

  useEffect(() => {
    if (changePasswort.status) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Check your email',
        showConfirmButton: false,
        timer: 2000
      })
      signIn(false)
      register(false)
      setLoading(false)
    }
    else if (changePasswort.status === false) {
      setErrorSendEmail(true)
      setLoading(false)
      setValidation(true)
      setEmail("")
    }
  }, [changePasswort])

  const handleSignIn = () => {
    setErrorSendEmail(false)
    signIn(false)
    register(false)
  }

  const handleSignUp = () => {
    setErrorSendEmail(false)
    signIn(false)
    register(true)
  }

  const handleValidationEmail = (e) => {
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const value = e.target.value
    setEmail(value.trim())
    setErrorSendEmail(false)

    regexEmail.test(value.trim()) ? setError(false) : setError(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgottenPassword(email))
    setLoading(true)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="text-start fs-6 text-black-50">A link will be sent to your email to change the password</h3>
        <div className="row mt-3">
          <label htmlFor="changeP" className="col form-label">Email:</label>
          {error
            ? <label htmlFor="changeP" className="col form-label text-danger fw-bold text-end">Invalid Email</label>
            : null
          }
        </div>
        <input type="text" value={email} autoFocus name="email" className="form-control" onChange={handleValidationEmail}
        />
        {errorSendEmail
          ? <label htmlFor="sendEmail" className="col form-label text-danger fw-bold text-start mt-3">This email does not exist, please enter another email or register.</label>
          : null
        }
        <div className={errorSendEmail ? "mt-2 d-grid" : "mt-4 d-grid"}>
          <button type="submit" className="btn btn-primary" name="validation" disabled={validation}>
            {loading
              ? <span className="spinner-border text-info" role="status"></span>
              : "Send validation"
            }
          </button>
        </div>
      </form>

      <div className="row mt-4">
        <span>You don't have an account? <button onClick={handleSignUp}
          className="bg-transparent border-0 mb-2 text-primary text-decoration-underline">Sign up</button></span>
        <span>You have an account? <button onClick={handleSignIn}
          className="bg-transparent border-0 text-primary text-decoration-underline">Login</button></span>

      </div>
    </>
  );
}

export default SendConfirmedEmail;