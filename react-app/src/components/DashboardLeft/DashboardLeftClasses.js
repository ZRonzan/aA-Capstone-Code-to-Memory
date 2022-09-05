import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, logOutDemoUser } from '../../store/session';
import image from '../../assets/logo500x500.svg'
import profileIcon from '../../assets/profile-logo.svg'
import "./DashboardLeftClasses.css"
import { getUserClassesThunk } from '../../store/currentuserclasses';
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';
import ClassCard from '../ClassCard/ClassCard';
import CreateClassModal from '../CreateClassModal/CreateClassModal';

const DashboardLeftClasses = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [classesCount, setClassesCount] = useState(0)
    const [sortedClasses, setSortedClasses] = useState([])

    const user = useSelector(state => state.session.user);
    const userClasses = useSelector(state => state.currentuserclasses)
    const dispatch = useDispatch()
    const history = useHistory()
    const pathName = useLocation().pathname

    useEffect(() => {
        const getData = async () => {
            const data = await dispatch(getUserClassesThunk())
        }
        getData();
    }, [])

    useEffect(() => {
        setClassesCount(Object.keys(userClasses).length)
        let sorted = Object.values(userClasses).sort((a, b) => b['id'] - a['id'])
        setSortedClasses(sorted)
        setIsLoaded(true)
    }, [userClasses])

    const logOutUser = async () => {
        setIsLoaded(false)
        await dispatch(logout())
        history.push('/')
    }

    console.log(userClasses)
    if ((pathName === '/dashboard' || pathName === '/dashboard/') && sortedClasses.length > 0) {
        history.push(`/dashboard/${sortedClasses[0]['id']}/about`)
    }

    return isLoaded && !!user && (
        <div className='dashboard-left-classses-main-container'>
            <div className='dashboard-left-classses-top'>
                <div className='dashboard-left-classses-logo'>
                    <img src={image} className='dashboard-left-classses-logo-image' alt='code-to-memory logo'></img>
                </div>
                <div className='dashboard-left-classses-profile'>
                    <div className='dashboard-left-classses-profile-icon'>
                        <img src={profileIcon} alt='profile icon' className='dashboard-left-classses-profile-image'></img>
                    </div>
                    <div className='dashboard-left-classses-profile-name'>
                        {`${user.first_name} ${user.last_name}`}
                    </div>
                    <div className='dashboard-left-classses-profile-details'>
                        {`X Total Cards Studied - X Decks Created`}
                    </div>
                </div>
                <div className='dashboard-left-classses-logout-container'>
                    <i
                        onClick={logOutUser}
                        className="fa-solid fa-right-from-bracket"
                    ></i>
                </div>
            </div>
            <div className='dashboard-left-classses-middle'>
                <div className='dashboard-left-classses-my-classes'>
                    {`MY CLASSES (${classesCount})`}
                </div>
                <div className='dashboard-left-classses-create'>
                    <CreateClassModal setSortedClasses={setSortedClasses}/>
                </div>
            </div>
            <div className='dashboard-left-classses-bottom'>
                {Object.keys(userClasses).length === 0 && (<div className='dashboard-left-classses-empty'>
                    <div className='dashboard-left-classses-header'>
                        Your library is empty
                    </div>
                    <div className='dashboard-left-classses-text'>
                        Create a class using the plus sign above and get started with your collection of wonderful studying materials.
                    </div>
                </div>)}
                {sortedClasses.length > 0 && (
                    sortedClasses.map((ele) => {
                        return (
                            <ClassCard myClass={ele} setSortedClasses={setSortedClasses}/>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default DashboardLeftClasses;