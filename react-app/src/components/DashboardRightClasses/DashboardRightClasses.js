import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './DashboardRightClasses.css'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import IMAGES from '../ClassCard/iconPath-copy.json'
import ICONS from '../ClassCard/icons'
import defaultImage from '../../assets/icons/coding.svg'
import DeleteClassModal from '../DeleteClassModal/DeleteClassModal';
import { editUserClassThunk } from '../../store/currentuserclasses';

const DashboardRightClasses = () => {
    const [isLoaded, setIslLoaded] = useState()
    const [image, setImage] = useState(defaultImage)
    const [sortedClasses, setSortedClasses] = useState([])
    const [showEditClassName, setShowEditClassName] = useState(false)
    const [originalClassName, setOriginalClassName] = useState("")
    const [className, setClassName] = useState("")
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const { classId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
    console.log(currentClassDetails)

    useEffect(() => {
        const getClassDetails = async () => {
            let data = await dispatch(getCurrentClassDetailsThunk(classId));
            if (data.class.name) {
                for (let i = 0; i < IMAGES.length; i++) {
                    if (data.class.name.toUpperCase().includes(IMAGES[i].name)) {
                        setImage(ICONS[IMAGES[i].name])
                        break;
                    }
                }
            }
            setOriginalClassName(data.class.name)
            setClassName(data.class.name)
            setIslLoaded(true)
        }
        getClassDetails()
    }, [])

    useEffect(() => {
        setIslLoaded(false)
        const getClassDetails = async () => {
            let data = await dispatch(getCurrentClassDetailsThunk(classId));
            if (data.class.name) {
                for (let i = 0; i < IMAGES.length; i++) {
                    if (data.class.name.toUpperCase().includes(IMAGES[i].name)) {
                        setImage(ICONS[IMAGES[i].name])
                        break;
                    }
                }
            }
            setOriginalClassName(data.class.name)
            setClassName(data.class.name)
            setIslLoaded(true)
        }
        getClassDetails()
    }, [classId, userClasses])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = []
        let newClassName = className.trim()
        if (newClassName.length > 50) {
            errors.push("Class name must be 50 characters or less.")
        }
        if (newClassName.length === 0) {
            errors.push("Class name is required")
        }
        if (errors.length > 0) {
            setErrors(errors)
            return
        }

        const editedClass = {
            "name": newClassName,
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

    return isLoaded ? (
        <div className='dashboard-right-class-container'>
            <div className='dashboard-right-class-top-container'>
                <div className='dashboard-right-class-top-container'>
                    <div className='dashboard-right-class-icon-container'>
                        <img src={image} className='dashboard-right-class-icon'>
                        </img>
                    </div>
                    <div className='dashboard-right-class-name-container'>
                        <div className='dashboard-right-class-name'>
                            {!showEditClassName ? (
                                <>
                                    {currentClassDetails['name']}
                                    {user.id === currentClassDetails['owner_id'] && (<i
                                        onClick={() => setShowEditClassName(true)}
                                        className="fa-solid fa-pencil edit-class-name"
                                        title='edit class name'
                                    >
                                    </i>)}
                                </>
                            ) : (
                                <>
                                    <form
                                        className='dashboard-right-class-name-form'
                                        onSubmit={(e) => handleSubmit(e)}
                                    >
                                        <input
                                            className='dashboard-right-class-name-input'
                                            onChange={(e) => {
                                                setErrors([])
                                                setClassName(e.target.value)
                                            }}
                                            type="text"
                                            placeholder='Class name is required'
                                            value={className}
                                        >
                                        </input>
                                        <div className='edit-class-confirm-cancel-container'>
                                            <i
                                                title="cancel changes"
                                                onClick={() => {
                                                    setErrors([])
                                                    setClassName(originalClassName)
                                                    setShowEditClassName(false)
                                                }}
                                                className="fa-solid fa-x edit-class"
                                            ></i>
                                            <button className='edit-class-save-button'>Save</button>
                                        </div>
                                    </form>
                                    <div className='edit-class-name-errors-container-outer'>
                                        {errors.length > 0 && (
                                            <>
                                                {errors.map((error, ind) => (
                                                    <div key={ind} className="edit-class-name-error">{error}</div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}

                        </div>
                        <div className='dashboard-right-class-creator-container'>
                            <div className='dashboard-right-class-creator'>
                                {`Creator: `} <span>{`${currentClassDetails.user.first_name} ${currentClassDetails.user.last_name}`}</span>
                            </div>
                            <div className='dashboard-right-class-items-stats'>
                                {`Decks: ${Object.keys(currentClassDecks).length} • Total Cards: ${30}`}
                            </div>
                        </div>
                        <div className='dashboard-right-class-options-container'>
                            {/* <div className='dashboard-right-class-options'>
                            <DeleteClassModal setSortedClasses={setSortedClasses} myClass={currentClassDetails} classPage={true} />
                        </div> */}
                        </div>
                    </div>
                </div>
                <div className='dashboard-right-class-mastery-container'>
                    <div className='dashboard-right-class-mastery-percentage'>
                        {`${45.236.toFixed(2)}%`}
                    </div>
                    <div className='dashboard-right-class-mastery-text'>
                        Mastery
                    </div>

                </div>
            </div>
            <div className='dashboard-right-class-navlinks-container'>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/about`}>
                    About
                </NavLink>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/decks`}>
                    {`Decks (${Object.keys(currentClassDecks).length})`}
                </NavLink>
            </div>
            <div className='dashboard-right-class-lower-container'>
                You can create your own classes using the "+" icon on the sidebar. Why not create one to get yourself started!
            </div>
        </div>
    ) : (
        null
    )
}

export default DashboardRightClasses;
