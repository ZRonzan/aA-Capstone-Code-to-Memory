import React, { useState } from 'react';
import SplashCarousel from './SplashCarousel';
import SplashPageComponent2 from './SplashPageComponent2';
import SplashPageComponent3 from './SplashPageComponent3';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Footer from '../Footer/Footer';

function SplashPage() {
    const user = useSelector(state => state.session.user)

    const history = useHistory()

    if (user) {
        history.push('/dashboard')
    }


    return (
        <div className='splash-page-main-container'>
            <SplashCarousel />
            <SplashPageComponent2 />
            <SplashPageComponent3 />
            <Footer />
        </div>
    );
}

export default SplashPage;
