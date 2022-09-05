import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardLeftClasses from '../DashboardLeft/DashboardLeftClasses';
import DashboardRightNoClasses from '../DashboardRightNoClasses/DashboardRightNoClasses';
import "./Dashboard.css"
import DashboardRightClasses from '../DashboardRightClasses/DashboardRightClasses';

const DashBoard = () => {

    const [dashBoardLoaded, setDashboardLoaded] = useState(false)
    const [classesCount, setClassesCount] = useState(0)

    const user = useSelector( state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)


    const dispatch = useDispatch()
    const history = useHistory()
    if (!user) {
        history.push('/')
    }



    useEffect(() => {
        setDashboardLoaded(true)
    }, [])

    return  dashBoardLoaded? (
        <div className='dashboard-outer-container'>
            <div className='dashboard-inner-left'>
                <DashBoardLeftClasses setDashboardLoaded={setDashboardLoaded} />
            </div>
            <div className='dashboard-inner-right'>
                {Object.keys(userClasses).length === 0 && (<DashboardRightNoClasses />)}
                {Object.keys(userClasses).length > 0 && (
                    <Switch>
                        <Route path='/dashboard/:classId'>
                            <DashboardRightClasses setDashboardLoaded={setDashboardLoaded} />
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    ): (
        null
    )
}

export default DashBoard;
