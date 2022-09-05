import React, { useEffect } from 'react';

const DashboardRightNoClasses = () => {

    useEffect(() => {
        setIsLoaded(true)
    },[])

    return isLoadeed && (
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
