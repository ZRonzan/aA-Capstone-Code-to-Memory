import React, { useState } from 'react';
import SplashCarousel from './SplashCarousel';
import SplashPageComponent2 from './SplashPageComponent2';
import SplashPageComponent3 from './SplashPageComponent3';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Footer from '../Footer/Footer';
import SplashPageComponent4 from './SplashPageComponent4';
import SplashPageComponent5 from './SplashPageComponent5';

function SplashPage({setShowModal1, setShowModal2}) {
    const user = useSelector(state => state.session.user)

    const history = useHistory()

    if (user) {
        history.push('/dashboard')
    }


    return (
        <div className='splash-page-main-container-inner'>
            <SplashCarousel />
            <SplashPageComponent2 />
            <SplashPageComponent3 />
            <SplashPageComponent4 />
            <SplashPageComponent5 setShowModal1={setShowModal1} setShowModal2={setShowModal2} />
        </div>
    );
}

export default SplashPage;
