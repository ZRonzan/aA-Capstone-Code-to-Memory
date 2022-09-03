import React, { useState } from 'react';
import "./SplashPageComponent4.css"
import image1 from "../../assets/splash-page-images/doctor.jpg"
import image2 from "../../assets/splash-page-images/lawyer.jpg"
import image3 from "../../assets/splash-page-images/nurse.jpg"
import image4 from "../../assets/splash-page-images/sommelier.jpg"
import image5 from "../../assets/splash-page-images/teacher.jpg"
import image6 from "../../assets/splash-page-images/traveller.jpg"

function SplashPageComponent4() {


    return (
        <div className='splash-component-4-outer-container'>
            <div className='splash-component-4-inner-container title'>
                <div>
                    Trusted by millions
                </div>
                <div>
                    to reach their goals.
                </div>
            </div>
            <div className='splash-component-4-inner-container cards'>
                <div className='splash-component-4-card'>
                    <img src={image1} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container one'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Carmen H.
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a doctor
                            </div>
                            <div className='splash-component-4-card text'>
                                A brilliant learning resource that has been developed for a couple weeks. I now know how to center a div! I would highly recommend this service!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='splash-component-4-card'>
                    <img src={image2} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container two'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Matthew Bates
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a lawyer
                            </div>
                            <div className='splash-component-4-card text'>
                                Centering divs is SO much better than being a lawyer. I would highly recommend this service!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='splash-component-4-card'>
                    <img src={image3} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container three'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Jenson R.
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a nurse
                            </div>
                            <div className='splash-component-4-card text'>
                                This app is straight fire dawg! I can now center a div
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='splash-component-4-inner-container cards'>
                <div className='splash-component-4-card'>
                    <img src={image4} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container four'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Sarah Sutel
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a sommelier
                            </div>
                            <div className='splash-component-4-card text'>
                                I've spent the past 6 months learning to center a div. I need a glass of wine. Would recommend!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='splash-component-4-card'>
                    <img src={image5} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container five'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Father Scott Hastings
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a teacher
                            </div>
                            <div className='splash-component-4-card text'>
                                Even teachers need good study tools. I really like this app and would recommend it to my students!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='splash-component-4-card'>
                    <img src={image6} alt='image of a person' className='splash-component-4-card image'></img>
                    <div className='splash-component-4-card text-container six'>
                        <div className='splash-component-4-card text-container-inner'>
                            <div className='splash-component-4-card title-text'>
                                Sophie Parker
                            </div>
                            <div className='splash-component-4-card header-text'>
                                Used to be a traveller
                            </div>
                            <div className='splash-component-4-card text'>
                                Since the lockdowns have prevented me from travelling. I took to this app to learn software. It's fantastic!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SplashPageComponent4;
