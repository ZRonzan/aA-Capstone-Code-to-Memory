import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import { getUserClassesThunk } from '../../store/currentuserclasses';
import IMAGES from '../ClassCard/iconPath-copy.json'
import ICONS from '../ClassCard/icons'
import defaultImage from '../../assets/icons/coding.svg'

import './DashboardRightCards.css'
import PreviewCard from '../PreviewCards/PreviewCard';
import DashboardRightNoCards from '../DashboardRightNoCards/DashboardRightNoCards';
import CreateCardModal from '../CreateCardModal/CreateCardModal';
import BrowsingDeck from '../BrowsingDeck/BrowsingDeck';
import ResetMasteryModal from '../ResetMasteryModal/ResetMasteryModal';

const DashboardRightCards = () => {
    const [isLoaded, setIsLoaded] = useState()
    const [image, setImage] = useState(defaultImage)
    const [currentSpot, setCurrentSpot] = useState(0)
    const [cardsArr, setCardsArr] = useState([])
    const [deckArr, setDeckArr] = useState([])
    const [deckMasteries, setDeckMasteries] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()

    const { classId, deckId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
    const currentClassMastery = useSelector(state => state.currentclassdetails.mastery)
    const currentDeck = currentClassDecks[deckId]

    useEffect(() => {
        const getClassDetails = async () => {
            await dispatch(getUserClassesThunk());
            const userDecks = await fetch('/api/decks/current-user-owned')
            const dat = await userDecks.json()


            if (!userClasses[classId] || !dat[deckId]) {
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
                if (currentDeck) {
                    setCardsArr(currentDeck.cards)
                }
                const getRatings = async () => {
                    const res = await fetch(`/api/mastery/deck/${deckId}`)
                    const data = await res.json()
                    const newObj = {}
                    data['deck_scores'].forEach(ele => {
                        let masteries = ['one', 'two', 'three', 'four', 'five']
                        let currMast = masteries[ele['mastery_score'] - 1]
                        newObj[ele['card_id']] = currMast
                    });
                    setDeckMasteries(newObj)
                }
                getRatings()
                setIsLoaded(true)
            }
        }
        getClassDetails()



    }, [])

    useEffect(() => {
        const getClassDetails = async () => {
            const userDecks = await fetch('/api/decks/current-user-owned')
            const dat = await userDecks.json()
            if (!userClasses[classId] || !dat[deckId]) {
                history.push('/404-page-not-found')
            } else {
                let data = await dispatch(getCurrentClassDetailsThunk(classId));

                setDeckArr(data.class.decks)

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
                const getRatings = async () => {
                    const res = await fetch(`/api/mastery/deck/${deckId}`)
                    const data = await res.json()
                    const newObj = {}
                    data['deck_scores'].forEach(ele => {
                        let masteries = ['one', 'two', 'three', 'four', 'five']
                        let currMast = masteries[ele['mastery_score'] - 1]
                        newObj[ele['card_id']] = currMast
                    });
                    setDeckMasteries(newObj)
                }
                getRatings()
                setIsLoaded(true)
            }
        }
        getClassDetails()



    }, [classId, userClasses, currentClassMastery])

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded ? (
        <div className='dashboard-right-cards-container'>
            <div className='dashboard-right-cards-top-container'>
                <NavLink
                    className='dashboard-right-class-navlink-container-cards deck'
                    to={`/dashboard/${classId}/decks`}
                >
                    <div className='dashboard-right-class-top-go-back-container cards'>
                        <i class="fa-solid fa-chevron-left cards-page"></i>
                    </div>
                    <div className='dashboard-right-class-icon-container-cards decks'>
                        <img src={image} className='dashboard-right-class-decks'>
                        </img>
                    </div>
                    <div className='dashboard-right-class-name-cards'>
                        {currentClassDetails['name']}
                    </div>
                </NavLink>
                <div className='dashboard-right-deck-name-cards'>
                    {currentDeck['name']}
                </div>
                <div className='dashboard-right-deck-number-cards'>
                    {`Deck ${deckArr.indexOf(currentDeck) + 1} of ${deckArr.length}`}
                </div>
                <div className='dashboard-right-deck-number-cards'>
                    <ResetMasteryModal oneDeck={currentDeck} />
                </div>
            </div>
            <div className='dashboard-right-class-navlinks-container cards'>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/decks/${deckId}/Preview`}>
                    Preview Cards
                </NavLink>
                <NavLink className='dashboard-right-class-navlink' to={`/dashboard/${classId}/decks/${deckId}/Browse`}>
                    Browse Deck / Study
                </NavLink>
            </div>
            <div className='dashboard-right-lower-container cards'>
                <Switch>
                    <Route exact path='/dashboard/:classId/decks/:deckId/Preview'>
                        {currentDeck.cards.length > 0 ? (
                            <>
                                <div className='create-card-sticky'>
                                    <div>
                                        CARDS
                                    </div>
                                    <div>
                                        <CreateCardModal />
                                    </div>
                                </div>
                                {currentDeck.cards.map((ele, i) => {
                                    return <PreviewCard card={ele} number={i + 1} mastery={deckMasteries[ele.id] ? deckMasteries[ele.id] : "none"} />
                                })}
                            </>
                        ) : (
                            <DashboardRightNoCards />
                        )}
                    </Route>
                    <Route exact path='/dashboard/:classId/decks/:deckId/Browse'>
                    {currentDeck.cards.length > 0 ? (
                            <>
                                <BrowsingDeck />
                            </>
                        ) : (
                            <DashboardRightNoCards />
                        )}
                    </Route>
                </Switch>
            </div>
        </div>
    ) : (
        null
    )
}

export default DashboardRightCards;
