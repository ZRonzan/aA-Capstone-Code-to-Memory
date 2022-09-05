import React, {useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import DashBoardLeftClasses from '../DashboardLeft/DashboardLeftClasses';
import DashboardRightNoClasses from '../DashboardRightNoClasses/DashboardRightNoClasses';
import "./Dashboard.css"

const DashBoard = () => {
    const user = useSelector( state => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()
    if (!user) {
        history.push('/')
    }

    const [isLoadeed, setIsLoaded] = useState(false)
    const [classesCount, setClassesCount] = useState(0)


    useEffect(() => {

    }, [])

    return (
        <div className='dashboard-outer-container'>
            <div className='dashboard-inner-left'>
                <DashBoardLeftClasses />
            </div>
            <div className='dashboard-inner-right'>
                <DashboardRightNoClasses />
            </div>
        </div>
    );
}

export default DashBoard;
