import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LogInForm from './LoginForm';
import SignUpForm from './SignUpForm';

function LogInFormModal() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    return (
        <>
            <div className='splash-page-navbar-button log-in'>
                <button
                    onClick={() => {
                        setShowModal1(true)
                        setShowModal2(false)
                    }}
                    className={`log-in-button`}
                >
                    Log In
                </button>
            </div>
            {showModal1 && (
                <>
                    <Modal onClose={() => setShowModal1(false)} formType="log-in">
                        <LogInForm setShowModal1={setShowModal1} setShowModal2={setShowModal2}/>
                    </Modal>
                </>
            )}
            <div className='splash-page-navbar-button sign-up'>
                <button
                    onClick={() => {
                        setShowModal2(true)
                        setShowModal1(false)
                    }}
                    className={`get-started-button`}
                >
                    Get Started
                </button>
            </div>
            {showModal2 && (
                <>
                    <Modal onClose={() => setShowModal2(false)} formType="sign-up">
                        <SignUpForm setShowModal2={setShowModal2} setShowModal1={setShowModal1}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default LogInFormModal;
