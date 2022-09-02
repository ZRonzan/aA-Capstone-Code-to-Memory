import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpFormModal.css'
import mainLogo from "../../assets/logo500x500.svg"

const SignUpForm = ({ setShowModal2, setShowModal1 }) => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let errors = []
    if (!first_name.length) {
      errors.push("First Name: Please provide a first name.")
    }
    if (!last_name.length) {
      errors.push("Last Name: Please provide a last name.")
    }
    if (!email.length) {
      errors.push("Email: Please provide an email.")
    }
    if (password !== repeatPassword) {
      errors.push("Password: Passwords do not match.")
    }
    if (errors.length) {
      setErrors(errors)
      return
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowModal2(false)
      }
    }

  };

  const updateFirstName = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastName = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='log-in-form-x-container'>
        <i className="fa-solid fa-xmark login" onClick={() => setShowModal2(false)}></i>
      </div>
      <div className='log-in-form-main-container'>
        <form onSubmit={onSignUp} className='log-in-form-form'>
          <div className='log-in-form-title'>
            Get Started
          </div>
          <img src={mainLogo} className={`ctm-logo-signup-${errors.length? "errors" : "no-errors"}`}>

          </img>
          <div
            style={{ visibility: `${errors.length ? "visible" : "hidden"}` }}
            className='log-in-form-errors signup'
            >
            {errors.map((error, ind) => (
              <div key={ind} className="log-in-error">{error}</div>
            ))}
          </div>
          <div className='log-in-form-email-container'>
            <label className='log-in-form-email-label'>First Name</label>
            <input
              className='log-in-form-email-field'
              type='text'
              name='first name'
              placeholder='(First Name Required)'
              onChange={updateFirstName}
              value={first_name}
            ></input>
          </div>
          <div className='log-in-form-email-container'>
            <label className='log-in-form-email-label'>Last Name</label>
            <input
              className='log-in-form-email-field'
              type='text'
              name='last name'
              placeholder='(Last Name Required)'
              onChange={updateLastName}
              value={last_name}
            ></input>
          </div>
          <div className='log-in-form-email-container'>
            <label className='log-in-form-email-label'>Email</label>
            <input
              className='log-in-form-email-field'
              type='email'
              name='email'
              placeholder='(Email Required)'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='log-in-form-email-container'>
            <label className='log-in-form-email-label'>Password</label>
            <input
              className='log-in-form-email-field'
              type='password'
              name='password'
              placeholder='(Password Required)'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='log-in-form-email-container'>
            <label className='log-in-form-email-label'>Repeat Password</label>
            <input
              className='log-in-form-email-field'
              type='password'
              name='repeat_password'
              placeholder='(Password Required)'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit' className='log-in-form-submit-button'>Sign Up</button>
          <div
            className='log-in-form-create-an-account'
            onClick={() => {
              setShowModal2(false)
              setShowModal1(true)
            }}>Already have an account?</div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
