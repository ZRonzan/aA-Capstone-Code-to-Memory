import React, { useState } from 'react';
import './Footer.css'

function Footer({setShowModal1, setShowModal2}) {


    return (
        <div className='footer-main-container'>
            {!!setShowModal1 && (<div className='footer-inner-container' >
                <div className='footer-column-title' >
                    Get Started
                </div>
                <div className='footer-link-container'>
                    <div className='footer-link' onClick={() => setShowModal1(true)}>Log In</div>
                    <div className='footer-link' onClick={() => setShowModal2(true)}>Sign Up</div>
                </div>
            </div>)}
            <div className='footer-inner-container' >
                <div className='footer-column-title' >
                    About The Developer
                </div>
                <div className='footer-link-container'>
                    <a className='footer-link' href="https://github.com/ZRonzan/aA-Capstone-Code-to-Memory" target="_blank">Github</a>
                    <a className='footer-link' href="https://www.linkedin.com/in/zeus-ronzan-b26313104/" target="_blank">LinkedIn</a>
                </div>
            </div>
            <div className='footer-inner-container' >
                <div className='footer-column-title' >
                    Resources Used
                </div>
                <div className='footer-link-container'>
                    <a className='footer-link' href="https://www.vecteezy.com/free-vector/coding" target="_blank">Coding Vectors by Vecteezy</a>
                    <a className='footer-link' href="https://iconscout.com/" target="_blank">Class icons from Iconscout</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
