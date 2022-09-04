import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logOutDemoUser } from '../../store/session';
import image from '../../assets/logo500x500.svg'
import profileIcon from '../../assets/profile-logo.svg'
import "./DashboardLeftClasses.css"
import { getUserClassesThunk } from '../../store/currentuserclasses';
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';
import ClassCard from '../ClassCard/ClassCard';

const DashboardLeftClasses = () => {
    const [isLoadeed, setIsLoaded] = useState(false)
    const [classesCount, setClassesCount] = useState(0)
    const [sortedClasses, setSortedClasses] = useState([])

    const user = useSelector(state => state.session.user);
    const userClasses = useSelector(state => state.currentuserclasses)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        const getData = async () => {
            const data = await dispatch(getUserClassesThunk())
        }
        getData();
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        setClassesCount(Object.keys(userClasses).length)
        let sorted = Object.values(userClasses).sort((a, b) => a['id'] - b['id'])
        setSortedClasses(sorted)
    }, [userClasses])

    const logOutDemoUser = async () => {
        let email = 'demo@aa.io'
        let password = 'password'
        await dispatch(login(email, password))
    }

    return isLoadeed && (
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
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>
            <div className='dashboard-left-classses-middle'>
                <div className='dashboard-left-classses-my-classes'>
                    {`MY CLASSES (${classesCount})`}
                </div>
                <div className='dashboard-left-classses-create'>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            <div className='dashboard-left-classses-bottom'>
                {classesCount === 0 && (<div className='dashboard-left-classses-empty'>
                    <div className='dashboard-left-classses-header'>
                        Your library is empty
                    </div>
                    <div className='dashboard-left-classses-text'>
                        Create a class using the plus sign above and get started with your collection of wonderful studying materials.
                    </div>
                </div>)}
                {classesCount > 0 && sortedClasses.length > 0 && (
                    sortedClasses.map((ele) => {
                        return (
                            <ClassCard myClass={ele} />
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default DashboardLeftClasses;
