import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserClassesThunk, editUserClassThunk } from '../../store/currentuserclasses'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import './DashboardRightAboutPage.css'

const DashboardRightAboutPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showFormSubmitButtons, setShowFormSubmitButtons] = useState(false)
    const [errors, setErrors] = useState([])


    const [initialHeadline, setInitialHeadline] = useState()
    const [editedHeadline, setEditedHeadline] = useState()
    const [editedHeadlineErrors, setEditedHeadlineErrors] = useState(null)

    const [initialDescription, setInitialDescription] = useState()
    const [editedDescription, setEditedDescription] = useState()
    const [editedDescriptionErrors, setEditedDescriptionErrors] = useState(null)

    const [initialPurpose, setInitialPurpose] = useState()
    const [editedPurpose, setEditedPurpose] = useState()
    const [editedPurposeErrors, setEditedPurposeErrors] = useState(null)

    const [initialPrivate, setInitialPrivate] = useState()
    const [editedPrivate, setEditedPrivate] = useState()
    const [editedPrivateErrors, setEditedPrivateErrors] = useState(null)



    const user = useSelector(state => state.session.user);
    const userClasses = useSelector(state => state.currentuserclasses);
    const currentClassDetails = useSelector(state => state.currentclassdetails.class);
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks);

    const { classId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const pathName = useLocation().pathname;

    useEffect(() => {
        const getClassDetails = async () => {
            let data = await dispatch(getCurrentClassDetailsThunk(classId));

            setInitialPrivate(data.class['private'])
            setEditedPrivate(data.class['private'])

            setInitialHeadline(data.class['headline'])
            setEditedHeadline(data.class['headline'])

            setInitialDescription(data.class['description'])
            setEditedDescription(data.class['description'])

            setInitialPurpose(data.class['purpose'])
            setEditedPurpose(data.class['purpose'])

            setIsLoaded(true)
        }
        getClassDetails()
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        setIsLoaded(false)
        const getClassDetails = async () => {
            let data = await dispatch(getCurrentClassDetailsThunk(classId));

            setInitialPrivate(data.class['private'])
            setEditedPrivate(data.class['private'])

            setInitialHeadline(data.class['headline'])
            setEditedHeadline(data.class['headline'])

            setInitialDescription(data.class['description'])
            setEditedDescription(data.class['description'])

            setInitialPurpose(data.class['purpose'])
            setEditedPurpose(data.class['purpose'])

            setIsLoaded(true)
        }
        getClassDetails()
    }, [classId])

    const resetData = () => {
        setEditedPrivate(initialPrivate)
        setEditedHeadline(initialHeadline)
        setEditedDescription(initialDescription)
        setEditedPurpose(initialPurpose)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let errorcheck = false

        let newHeadline = editedHeadline.trim()
        let newDescription = editedDescription.trim()
        let newPurpose = editedPurpose.trim()
        let newPrivacy = editedPrivate

        if (newHeadline.length > 300) {

        }
        if (newDescription.length > 1000) {
            
        }


        if (errorcheck) {
            return
        }

        const editedClass = {
            "name": currentClassDetails['name'],
            "purpose": newPurpose,
            "headline": newHeadline,
            "description": newDescription,
            "private": newPrivacy,
            "owner_id": currentClassDetails['owner_id'],
        }

        await dispatch(editUserClassThunk(editedClass, currentClassDetails['id']))
        setShowFormSubmitButtons(false)
    }

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded && (
        <div className='dashboard-right-about-page-main-container'>
            <div
                className='dashboard-right-about-page-edit-buttons-container'
                style={{ visibility: `${currentClassDetails['owner_id'] === user.id}? "visible" : "hidden"` }}
            >
                {!showFormSubmitButtons ? (
                    <button
                        className='dashboard-right-about-page-edit-buttons edit'
                        onClick={() => {
                            setShowFormSubmitButtons(true)
                        }}
                    >
                        Edit About details
                    </button>
                ) : (<>
                    <button
                        className='dashboard-right-about-page-edit-buttons save'
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    <button
                        className='dashboard-right-about-page-edit-buttons cancel'
                        onClick={() => {
                            resetData()
                            setShowFormSubmitButtons(false)
                        }}
                    >
                        Cancel
                    </button>
                </>)}
            </div>
            <form
                className='dashboard-right-about-page-main-container'
            >
                <div className='dashboard-right-about-text-container'>
                    <div className='dashboard-right-about-text-title'>
                        Headline
                    </div>
                    {!showFormSubmitButtons ? (
                        <div className='dashboard-right-about-text-body'>
                            {currentClassDetails['headline'] ? currentClassDetails['headline'] :
                                user['id'] === currentClassDetails['owner_id'] ?
                                    "No headline. Click the Edit button to add a headline." : "No headline."}
                        </div>
                    ) : (
                        <>
                            <input
                                className='dashboard-right-edit-text-field'
                                type="text"
                                onChange={(e) => {
                                    setEditedHeadline(e.target.value)
                                }}
                                placeholder='Give a brief overview of your class'
                                value={editedHeadline}
                            >
                            </input>
                            <div className='edit-about-class-form-error-container'>
                                {!!editedHeadlineErrors && (
                                    <div className='edit-about-class-form-error'>
                                        {editedHeadlineErrors}
                                    </div>
                                )}
                            </div>
                        </>


                    )}
                </div>
                <div className='dashboard-right-about-text-container'>
                    <div className='dashboard-right-about-text-title'>
                        Description
                    </div>
                    {!showFormSubmitButtons ? (
                        <div className='dashboard-right-about-text-body'>
                            {currentClassDetails['description'] ? currentClassDetails['description'] :
                                user['id'] === currentClassDetails['owner_id'] ?
                                    "No description. Click the Edit button to add a description." : "No description."}
                        </div>
                    ) : (
                        <>
                            <textarea
                                className='dashboard-right-edit-text-area-field'
                                type="text"
                                onChange={(e) => {
                                    setEditedDescription(e.target.value)
                                }}
                                placeholder='Add a more detailed description of your class.'
                                value={editedDescription}
                            >
                            </textarea>
                            <div className='edit-about-class-form-error-container'>
                                {!!editedDescriptionErrors && (
                                    <div className='edit-about-class-form-error'>
                                        {editedDescriptionErrors}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className='dashboard-right-about-text-container'>
                    <div className='dashboard-right-about-text-title'>
                        Purpose
                    </div>
                    {!showFormSubmitButtons ? (<div className='dashboard-right-about-text-body'>
                        {currentClassDetails['purpose']}
                    </div>) : (
                        <>
                            <input
                                className='dashboard-right-edit-text-field'
                                type='text'
                                onChange={(e) => {
                                    setEditedPurpose(e.target.value)
                                }}
                                placeholder='Give a short tag detailing this class e.g "Python study", "Learning JavaScript"'
                                value={editedPurpose}
                            >
                            </input>
                            <div className='edit-about-class-form-error-container'>
                                {!!editedPurposeErrors && (
                                    <div className='edit-about-class-form-error'>
                                        {editedPurposeErrors}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className='dashboard-right-about-text-container'>
                    {!showFormSubmitButtons && (<div className='dashboard-right-about-text-title'>
                        Public class
                    </div>)}
                    {!showFormSubmitButtons ? (<div className='dashboard-right-about-text-body'>
                        {currentClassDetails['private'] ? "No" : "Yes"}
                    </div>) : (
                        null
                        // <div>
                        //     {"Privacy: "}
                        //     <input
                        //         onClick={() => setEditedPrivate(false)}
                        //         type='radio'
                        //         checked={!editedPrivate}
                        //     >
                        //     </input> Public
                        //     <input
                        //         onClick={() => setEditedPrivate(true)}
                        //         type='radio'
                        //         checked={editedPrivate}
                        //     >
                        //     </input> Private
                        // </div>
                    )}
                </div>


            </form>
        </div>
    );
}

export default DashboardRightAboutPage;
