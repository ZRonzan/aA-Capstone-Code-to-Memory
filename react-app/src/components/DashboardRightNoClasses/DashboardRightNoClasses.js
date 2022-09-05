import React, { useState,useEffect } from 'react';

const DashboardRightNoClasses = () => {

    const [isLoaded, setIslLoaded] = useState()

    useEffect(() => {
        setIslLoaded(true)
    },[])

    return (
        <div>
            <div>
                Add Classes to your Library
            </div>
            <div>
                Your librabry is empty
            </div>
            <div>
                You can create your own classes using the "+" icon on the sidebar. Why not create one to get yourself started!
            </div>
        </div>
    );
}

export default DashboardRightNoClasses;
