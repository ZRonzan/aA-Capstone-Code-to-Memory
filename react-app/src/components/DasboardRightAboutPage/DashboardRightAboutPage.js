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

const DashboardRightAboutPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    const user = useSelector(state => state.session.user);
    const userClasses = useSelector(state => state.currentuserclasses);
    const currentClassDetails = useSelector(state => state.currentclassdetails.class);
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks);

    const dispatch = useDispatch();
    const history = useHistory();
    const pathName = useLocation().pathname;

    useEffect(() => {

        setIsLoaded(true)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = []

        if (errors.length > 0) {
            setErrors(errors)
            return
        }

        const editedClass = {
            "name": currentClassDetails['name'],
            "purpose": currentClassDetails['name'],
            "headline": currentClassDetails['name'],
            "description": currentClassDetails['name'],
            "private": currentClassDetails['name'],
            "owner_id": currentClassDetails['owner_id'],
        }

        await dispatch(editUserClassThunk(editedClass, currentClassDetails['id']))
        setShowEditClassName(false)
    }

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded && (
        <div className='dashboard-left-classses-main-container'>

        </div>
    );
}

export default DashboardRightAboutPage;
