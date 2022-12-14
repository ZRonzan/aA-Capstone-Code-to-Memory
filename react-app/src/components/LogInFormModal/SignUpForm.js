import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory()

  const onSignUp = async (e) => {


    e.preventDefault();
    let errors = []
    if (!first_name.length) {
      errors.push("Please provide a first name.")
    } else if (first_name.length > 30) {
      errors.push("Please choose a first name shorter than 30 characters.")
    }

    if (!last_name.length) {
      errors.push("Please provide a last name.")
    }else if (last_name.length > 30) {
      errors.push("Please choose a last name shorter than 30 characters.")
    }

    if (!email.length) {
      errors.push("Please provide an email.")
    } else if (!validateEmail(email)) {
      errors.push("Please provide a correctly formatted email.")
    } else if (email.length > 254) {
      errors.push("The provided email is too long (greater than 254 characters).")
    }

    if (!password || !repeatPassword) {
      errors.push("Both password input fields must be filled.")
    } else if (password !== repeatPassword) {
      errors.push("Passwords do not match.")
    } else if (password.includes(" ") || repeatPassword.includes(" ")) {
      errors.push("Passwords cannot contain spaces.")
    } else if (password.length < 8) {
      errors.push("Passwords need to be at least 8 characters long")
    } else if (password.length > 100) {
      errors.push("The provided password is too long (greater than 100 characters).")
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateFirstName = (e) => {
    let firstname = e.target.value.trim()
    setErrors([])
    setFirstname(firstname);
  };

  const updateLastName = (e) => {
    let lastName = e.target.value.trim()
    setErrors([])
    setLastname(lastName);
  };

  const updateEmail = (e) => {
    let newEmail = e.target.value.trim()
    setErrors([])
    setEmail(newEmail);
  };

  const updatePassword = (e) => {
    let password = e.target.value
    setErrors([])
    setPassword(password);
  };

  const updateRepeatPassword = (e) => {
    let password = e.target.value
    setErrors([])
    setRepeatPassword(password);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
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
          {/* <img src={mainLogo} className={`ctm-logo-signup-${errors.length ? "errors" : "no-errors"}`}>

          </img> */}
          {errors.length > 0 && (<div
            className='log-in-form-errors signup'
          >
            <div className='log-in-form-errors signup inner'>
              {errors.map((error, ind) => (
                <div key={ind} className="log-in-error">{error}</div>
              ))}
            </div>
          </div>)}
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
              // type='email'
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
