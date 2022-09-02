import React, { useState } from 'react';
import "./SplashCarousel.css"
import demoImage from '../../assets/carousel-images/image1.jpg'

function SplashCarousel() {


    return (
        <div className='splash-carousel-outer-container'>
            <div className='splash-carousel-main-container'>
                <img className='splash-carousel-image-container' src={demoImage}>

                </img>
                <div className='splash-carousel-text-container'>
                    <div className='splash-carousel-title'>
                        Rise to
                    </div>
                    <div className='splash-carousel-title'>
                        your challenge.
                    </div>
                    <div className='splash-carousel-subtitle'>
                        FlashCards for <span className='bolden'>serious coders.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashCarousel;
