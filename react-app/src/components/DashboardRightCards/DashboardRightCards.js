import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import IMAGES from '../ClassCard/iconPath-copy.json'
import ICONS from '../ClassCard/icons'
import defaultImage from '../../assets/icons/coding.svg'

import './DashboardRightCards.css'

const DashboardRightCards = () => {
    const [isLoaded, setIsLoaded] = useState()
    const [image, setImage] = useState(defaultImage)
    const [currentSpot, setCurrentSpot] = useState(0)
    const [cardsArr, setCardsArr] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const { classId, deckId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
    const currentDeck = currentClassDecks[deckId]

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
            if (currentDeck) {
                setCardsArr(currentDeck.cards)
            }
            setIsLoaded(true)
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
            if (currentDeck) {
                setCardsArr(currentDeck.cards)
            }
            setIsLoaded(true)
        }
        getClassDetails()
    }, [classId,userClasses])

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded ? (
        <div className='dashboard-right-cards-container'>
            <div className='dashboard-right-class-top-container'>
                <div>
                </div>
                <div className='dashboard-right-class-icon-container'>
                    <img src={image} className='dashboard-right-class-icon'>
                    </img>
                </div>
                <div>
                    {currentClassDetails['name']}
                </div>
                <div>
                    {currentDeck['name']}
                </div>
            </div>
            <div className='dashboard-right-class-navlinks-container'>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/decks/${deckId}/Preview`}>
                    Preview Cards
                </NavLink>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/decks/${deckId}/Browse`}>
                    Browse Deck
                </NavLink>
            </div>
            <div className='dashboard-right-class-lower-container'>
                <Switch>
                    <Route exact path='/dashboard/:classId/decks/:deckId/Preview'>
                        PREVIEWING DECK
                    </Route>
                    <Route exact path='/dashboard/:classId/decks/:deckId/Browse'>
                        BROWSING DECK
                    </Route>
                </Switch>
            </div>
        </div>
    ) : (
        "isLoadedisfalse"
    )
}

export default DashboardRightCards;
