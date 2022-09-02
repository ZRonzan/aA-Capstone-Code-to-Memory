import React, { useState } from 'react';
import SplashCarousel from './SplashCarousel';
import SplashPageComponent2 from './SplashPageComponent2';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'

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
            <a href="https://www.vecteezy.com/free-vector/coding">Coding Vectors by Vecteezy</a>
        </div>
    );
}

export default SplashPage;
