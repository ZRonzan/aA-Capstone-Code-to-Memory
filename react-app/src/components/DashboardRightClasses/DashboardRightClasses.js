import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './DashboardRightClasses.css'
import { getCurrentClassDetailsThunk, getCurrentClassMasteryThunk } from '../../store/currentclassdetails';
import IMAGES from '../ClassCard/iconPath-copy.json'
import ICONS from '../ClassCard/icons'
import defaultImage from '../../assets/icons/coding.svg'
import { editUserClassThunk, getUserClassesThunk } from '../../store/currentuserclasses';
import DashboardRightAboutPage from '../DasboardRightAboutPage/DashboardRightAboutPage';
import DashboardRightDecks from '../DashboardRightDecks/DashboardRightDecks';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

const DashboardRightClasses = () => {
    const [isLoaded, setIsLoaded] = useState()
    const [image, setImage] = useState(defaultImage)
    const [sortedClasses, setSortedClasses] = useState([])
    const [totalCards, setTotalCards] = useState(0)
    const [showEditClassName, setShowEditClassName] = useState(false)
    const [originalClassName, setOriginalClassName] = useState("")
    const [className, setClassName] = useState("")
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const { classId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClass = useSelector(state => state.currentclassdetails)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
    const masteryObj = useSelector(state => state.currentclassdetails.mastery)
    const masteryScore = masteryObj['masteryScore']

    useEffect(() => {
        const getClassDetails = async () => {
            await dispatch(getUserClassesThunk());
            if (!userClasses[classId]) {
                history.push('/404-page-not-found')
            } else {
                let data = await dispatch(getCurrentClassDetailsThunk(classId));
                if (data.class.name) {
                    for (let i = 0; i < IMAGES.length; i++) {
                        if (data.class.name.toUpperCase().includes(IMAGES[i].name)) {
                            setImage(ICONS[IMAGES[i].name])
                            break;
                        }
                    }
                }

                const decks = data.class.decks;
                const deckIds = decks.map(ele => ele.id);

                await dispatch(getCurrentClassMasteryThunk(deckIds))

                setOriginalClassName(data.class.name)
                setClassName(data.class.name)
                // setIsLoaded(true)
            }
        }
        getClassDetails()
    }, [])

    useEffect(() => {
        setIsLoaded(false)

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

            const decks = data.class.decks;
            const deckIds = decks.map(ele => ele.id);

            await dispatch(getCurrentClassMasteryThunk(deckIds))

            setOriginalClassName(data.class.name)
            setClassName(data.class.name)
            setIsLoaded(true)
        }

        if (!userClasses[classId]) {
            history.push('/404-page-not-found')
        } else {
            getClassDetails()
        }
    }, [classId, userClasses])

    const countCards = () => {
        if (currentClassDecks) {
            let cardCount = 0
            Object.values(currentClassDecks).forEach(ele => {
                cardCount = cardCount + ele['cards'].length
            })
            console.log(cardCount)
            return cardCount
        } else {
            return 0
        }
    }

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
            "purpose": currentClassDetails['purpose'],
            "headline": currentClassDetails['headline'],
            "description": currentClassDetails['description'],
            "private": currentClassDetails['private'],
            "owner_id": currentClassDetails['owner_id'],
        }

        await dispatch(editUserClassThunk(editedClass, currentClassDetails['id']))
        setShowEditClassName(false)
    }

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }
    console.log("MASTERY OBJ 2", masteryObj)
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
                                        onSubmit={(e) => {
                                            handleSubmit(e)
                                        }}
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
                                            <button
                                                className='edit-class-save-button'
                                            >Save</button>
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
                                {`Decks: ${Object.keys(currentClassDecks).length} • Total Cards: ${countCards()}`}
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
                        {`${countCards() > 0 ? ((masteryScore / (countCards() * 5)) * 100).toFixed(2) : 0.00.toFixed(2)}%`}
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
                <Switch>
                    <Route exact path='/dashboard/:classId/about'>
                        <DashboardRightAboutPage />
                    </Route>
                    <Route exact path='/dashboard/:classId/decks'>
                        <DashboardRightDecks />
                    </Route>
                    <Route path='*'>
                        <PageNotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    ) : (
        null
    )
}

export default DashboardRightClasses;
