import React, { useState } from 'react';
import "./SplashPageComponent2.css"
import image from "../../assets/splash-page-images/Project_69-07.jpg"

function SplashPageComponent2() {


    return (
        <div className='splash-component-2-outer-container'>
            <div className='splash-component-2-main-container'>
                <img src={image} className='splash-component-2-image-container'>

                </img>
                <div className='splash-component-2-text-container'>
                    <div className='splash-component-2-title'>
                        Attack
                    </div>
                    <div className='splash-component-2-title'>
                        your weaknesses.
                    </div>
                    <div className='splash-component-2-subtitle'>
                        CTM's online flashcards optimize your studying, giving you the perfect place to organize your notes for you to practice later.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashPageComponent2;
