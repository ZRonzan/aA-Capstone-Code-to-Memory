import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LogInFormModal.css'

const LoginForm = ({ setShowModal1, setShowModal2 }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    let errors = []

    if (!email.length) {
      errors.push("Please provide an email")
    } else if (email.length > 254) {
      errors.push("The provided email is too long (greater than 256 characters).")
    }
    if (!password.length) {
      errors.push("Please provide a password")
    } else if (password.length < 8) {
      errors.push("Passwords need to be at least 8 characters long")
    } else if (password.length > 100) {
      errors.push("The provided password is too long (greater than 100 characters). ")
    }

    if (errors.length) {
      setErrors(errors)
      return
    }

    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(["Password or email is incorrect"]);
    } else {
      setShowModal1(false)
    }
  };

  const updateEmail = (e) => {
    let newEmail = e.target.value.trim()
    setErrors([])
    setEmail(newEmail);
  };

  const updatePassword = (e) => {
    let password = e.target.value.trim()
    setErrors([])
    setPassword(password);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <div className='log-in-form-x-container'>
        <i className="fa-solid fa-xmark login" onClick={() => setShowModal1(false)}></i>
      </div>
      <div className='log-in-form-main-container'>
        <form onSubmit={onLogin} className='log-in-form-form'>

          <div className='log-in-form-title'>
            Log In
          </div>
          {errors.length > 0 && (<div className='log-in-form-errors login'>
            <div
              className='log-in-form-errors login inner'
            >
              {errors.map((error, ind) => (
                <div key={ind} className="log-in-error">{error}</div>
              ))}
            </div>
          </div>)}
          <div className='log-in-form-email-container'>
            <label htmlFor='email' className='log-in-form-email-label'>Email</label>
            <input
              className='log-in-form-email-field'
              name='email'
              type='text'
              placeholder='(Email Required)'
              value={email}
              onChange={updateEmail}
            />
          </div>

          <div className='log-in-form-password-container'>
            <label htmlFor='password' className='log-in-form-password-label'>Password</label>
            <input className='log-in-form-password-field'
              name='password'
              type='password'
              placeholder='(Password Required)'
              value={password}
              onChange={updatePassword}
            />
          </div>

          <button type='submit' className='log-in-form-submit-button'>Login</button>
          <div
            className='log-in-form-create-an-account'
            onClick={() => {
              setShowModal1(false)
              setShowModal2(true)
            }}>
            Create an account?
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
