
import React from 'react';
import { useDispatch } from 'react-redux';
import LogInFormModal from './LogInFormModal/LogInFormModal';
import { login } from '../store/session';
import { ReactComponent as SplashLogo } from '../assets/MainLogo.svg';
import "./SplashPage/SplashPage.css"

const NavBar = ({showModal1, showModal2, setShowModal1, setShowModal2}) => {

  const dispatch = useDispatch()

  const logInDemoUser = async () => {
    let email = 'demo@aa.io'
    let password = 'password'
    await dispatch(login(email, password))
  }

  return (
    <div className='splash-page-navbar-main-container'>
      <div className='splash-navbar-left-container'>
        <div className='splash-page-main-logo'>
          <SplashLogo />
        </div>
      </div>
      <div className='splash-navbar-right-container'>
        <div className='splash-page-navbar-button demo-user'>
          <button
            onClick={() => logInDemoUser()}
            className={`demo-login-button`}
          >
            Demo User Log In
          </button>
        </div>
        <LogInFormModal showModal1={showModal1} showModal2={showModal2} setShowModal1={setShowModal1} setShowModal2={setShowModal2}/>
      </div>
    </div>
  );
}

export default NavBar;
