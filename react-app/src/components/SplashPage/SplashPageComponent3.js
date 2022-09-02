import React, { useState } from 'react';
import "./SplashPageComponent3.css"
import image1 from "../../assets/splash-page-images/make-icon.svg"
import image2 from "../../assets/splash-page-images/sync-icon.svg"
import image3 from "../../assets/splash-page-images/share-icon.svg"
import image4 from "../../assets/splash-page-images/trust-icon.svg"
import image5 from "../../assets/splash-page-images/study-icon.svg"
import image6 from "../../assets/splash-page-images/track-icon.svg"

function SplashPageComponent3() {


    return (
        <div className='splash-component-3-outer-container'>
            <div className='splash-component-3-main-container'>
                <div className='splash-component-3-text-container'>
                    <div className='splash-component-3-title'>
                        The world's first
                    </div>
                    <div className='splash-component-3-title'>
                        flashcard app.*
                    </div>
                    <div className='splash-component-2-subtitle'>
                        (*Made by Zeus Ronzan...)
                    </div>
                    <div className='splash-component-2-subtitle'>
                         Optimized for desktop usage, with more device support planned.
                    </div>
                </div>
                <div className='splash-component-3-right-container'>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image1} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                            <span className="splash-component-3-first-word">Make</span> better flashcards
                        </div>
                    </div>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image2} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                        <span className="splash-component-3-first-word">Study</span> all your topics in one place
                        </div>
                    </div>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image3} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                        <span className="splash-component-3-first-word">Secure</span> your study materials
                        </div>
                    </div>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image4} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                        <span className="splash-component-3-first-word">Create</span> the flashcards that suit you
                        </div>
                    </div>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image5} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                        <span className="splash-component-3-first-word">Study</span> more efficiently
                        </div>
                    </div>
                    <div className='splash-component-3-inner-right row'>
                        <img src={image6} className='splash-component-3-inner-right image'>

                        </img>
                        <div className='splash-component-3-inner-right text'>
                        <span className="splash-component-3-first-word">Track</span> your mastery
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashPageComponent3;
