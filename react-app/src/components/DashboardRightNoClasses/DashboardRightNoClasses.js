import React, { useState,useEffect } from 'react';
import './DashboardRightNoClasses.css'

const DashboardRightNoClasses = () => {

    const [isLoaded, setIslLoaded] = useState()

    useEffect(() => {
        setIslLoaded(true)
    },[])

    return (
        <div className='dashboard-right-no-classes-container'>
            <div className='dashboard-right-no-classes-title'>
                Add Classes to your Library
            </div>
            <div className='dashboard-right-no-classes-subtitle'>
                Your library is empty
            </div>
            <div className='dashboard-right-no-classes-text'>
                You can create your own classes using the "+" icon on the sidebar. Why not create one to get yourself started!
            </div>
        </div>
    );
}

export default DashboardRightNoClasses;
