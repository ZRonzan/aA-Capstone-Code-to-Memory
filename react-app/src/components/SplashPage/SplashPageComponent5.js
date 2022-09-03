import React, { useState } from 'react';
import "./SplashPageComponent5.css"
import image from "../../assets/splash-page-images/band-10-background.jpeg"

function SplashPageComponent5({ setShowModal1, setShowModal2 }) {


    return (
        <div className='splash-component-5-outer-container' style={{backgroundImage: `url(${image})`}}>
            <div className='splash-component-5-main-container'>
                {/* <img src={image} className='splash-component-5-image' alt="image of glasses and a phone">

                </img> */}
                <div className='splash-component-5-text-container'>
                    <div className='splash-component-5-title'>
                        Dream.
                    </div>
                    <div className='splash-component-5-title'>
                        Learn.
                    </div>
                    <div className='splash-component-5-title'>
                        Achieve.
                    </div>
                    <div className='splash-component-5-subtitle'>
                        With Code-to-Memory, the journey to your aspirations just became a lot simpler. Tailored to you and how you learn.
                    </div>
                    <button className='splash-page-component-5-button' onClick={() => setShowModal2(true)}>Register Today</button>
                </div>
            </div>
        </div>
    );
}

export default SplashPageComponent5;
