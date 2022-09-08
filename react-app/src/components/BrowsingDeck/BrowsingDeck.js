import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import { getUserClassesThunk } from '../../store/currentuserclasses';

import './BrowsingDeck.css'

const BrowsingDeck = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentSpot, setCurrentSpot] = useState(0)
    const [answerRevealed, setAnswerRevealed] = useState(false)
    const [cardsArr, setCardsArr] = useState([])
    const [deckMasteries, setDeckMasteries] = useState({})
    const [deckMasteries2, setDeckMasteries2] = useState({}) // contains the objects for each matery record. to be used when sending the PUT and POST fetch requests

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
            const userDecks = await fetch('/api/decks/current-user-owned')
            const dat = await userDecks.json()

            if (!userClasses[classId] || !dat[deckId]) {
                history.push('/404-page-not-found')
            } else {
                if (currentDeck) {
                    setCardsArr(currentDeck.cards)
                }
                const getRatings = async () => {
                    const res = await fetch(`/api/mastery/deck/${deckId}`)
                    const data = await res.json()
                    const newObj = {}
                    const newObj2 = {}
                    data['deck_scores'].forEach(ele => {
                        let masteries = ['one', 'two', 'three', 'four', 'five']
                        let currMast = masteries[ele['mastery_score'] - 1]
                        newObj[ele['card_id']] = currMast
                        newObj2[ele['card_id']] = ele
                    });
                    setDeckMasteries(newObj)
                    setDeckMasteries2(newObj2)
                }
                getRatings()
            }
        }
        getClassDetails()
    }, [])

    useEffect(() => {
        const getRatings = async () => {
            const res = await fetch(`/api/mastery/deck/${deckId}`)
            const data = await res.json()
            const newObj = {}
            const newObj2 = {}
            data['deck_scores'].forEach(ele => {
                let masteries = ['one', 'two', 'three', 'four', 'five']
                let currMast = masteries[ele['mastery_score'] - 1]
                newObj[ele['card_id']] = currMast
                newObj2[ele['card_id']] = ele
            });
            setDeckMasteries(newObj)
            setDeckMasteries2(newObj2)
        }
        getRatings()
        setIsLoaded(true)

    }, [classId, currentClassDetails])

    const handleSubmit = async (score, cardId) => {
        console.log("setting score: ", score, "for card: ", cardId)
        const newScore = {
            "user_id": user.id,
            "card_id": cardId,
            "mastery_score": score
        }

        if (deckMasteries[cardId]) {
            const res = await fetch(`/api/mastery/${deckMasteries2[cardId]['id']}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newScore)
            });
            const data = await res.json()
            await dispatch(getCurrentClassDetailsThunk(classId))
            await dispatch(getUserClassesThunk())
        } else {
            const res = await fetch('/api/mastery/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newScore)
            });
            const dat = res.json()
            console.log(dat)
            const data1 = await dispatch(getCurrentClassDetailsThunk(classId))
            const data2 = await dispatch(getUserClassesThunk())
        }

    }



    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded && cardsArr.length > 0 ? (
        <div className='dashboard-right-browse-container'>
            <div className='dashboard-right-browse-chevron'>
                {currentSpot > 0 && (<i
                    onClick={() => {
                        setCurrentSpot(currentSpot - 1)
                        setAnswerRevealed(false)
                    }}
                    className="fa-solid fa-chevron-left browsing-deck"
                ></i>)}
            </div>
            <div
                className='dashboard-right-browse-body-container'
            >
                <div className='dashboard-right-browse-card-container'>
                    {cardsArr.length > 0 && (
                        <div
                            className={`dashboard-right-browse-body-card ${deckMasteries[cardsArr[currentSpot]['id']] ? deckMasteries[cardsArr[currentSpot]['id']] : "none"}`}
                        >
                            <div className='preview-card-q-a card-queue'>
                                {`Card ${currentSpot + 1} of ${cardsArr.length}`}
                            </div>
                            {!answerRevealed ? (
                                <>
                                    <div className='preview-card-q-a'>
                                        Q
                                    </div>
                                    <div className='dashboard-right-browse-body-card-text'>
                                        {cardsArr[currentSpot]['question']}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='preview-card-q-a'>
                                        A
                                    </div>
                                    <div className='dashboard-right-browse-body-card-text'>
                                        {cardsArr[currentSpot]['answer']}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div
                    className='dashboard-right-browse-bottom-butttons-container'
                >
                    {!answerRevealed ? (
                        <div
                            className={`dashboard-right-browse-bottom-butttons-reveal ${deckMasteries[cardsArr[currentSpot]['id']] ? deckMasteries[cardsArr[currentSpot]['id']] : "none"}`}
                            onClick={() => {
                                setAnswerRevealed(true)
                            }}
                        >
                            Reveal Answer
                        </div>
                    ) : (
                        <>
                            <div
                                className='dashboard-right-browse-bottom-butttons-score-question'
                            >
                                How confident were you with your answer?
                            </div>
                            <div
                                className='dashboard-right-browse-bottom-butttons-score-container'
                            >
                                <div
                                    className='dashboard-right-browse-bottom-butttons-score-button one'
                                    onClick={() => {
                                        if (currentSpot === cardsArr.length - 1) {
                                            handleSubmit(1, cardsArr[currentSpot]['id'])
                                            setAnswerRevealed(false)
                                        } else {
                                            handleSubmit(1, cardsArr[currentSpot]['id'])
                                            setCurrentSpot(currentSpot + 1)
                                            setAnswerRevealed(false)
                                        }
                                    }}
                                    value={1}
                                >
                                    1
                                    <div
                                        className='dashboard-right-browse-bottom-butttons-score-button-subtext'
                                    >
                                        Not at all
                                    </div>
                                </div>
                                <div
                                    className='dashboard-right-browse-bottom-butttons-score-button two'
                                    onClick={() => {
                                        if (currentSpot === cardsArr.length - 1) {
                                            handleSubmit(2, cardsArr[currentSpot]['id'])
                                            setAnswerRevealed(false)
                                        } else {
                                            handleSubmit(2, cardsArr[currentSpot]['id'])
                                            setCurrentSpot(currentSpot + 1)
                                            setAnswerRevealed(false)
                                        }
                                    }}
                                    value={2}

                                >
                                    2
                                    <div
                                        className='dashboard-right-browse-bottom-butttons-score-button-subtext'
                                    >
                                    </div>
                                </div>
                                <div
                                    className='dashboard-right-browse-bottom-butttons-score-button three'
                                    onClick={() => {
                                        if (currentSpot === cardsArr.length - 1) {
                                            handleSubmit(3, cardsArr[currentSpot]['id'])
                                            setAnswerRevealed(false)
                                        } else {
                                            handleSubmit(3, cardsArr[currentSpot]['id'])
                                            setCurrentSpot(currentSpot + 1)
                                            setAnswerRevealed(false)
                                        }
                                    }}
                                    value={3}

                                >
                                    3
                                    <div
                                        className='dashboard-right-browse-bottom-butttons-score-button-subtext'
                                    >
                                    </div>
                                </div>
                                <div
                                    className='dashboard-right-browse-bottom-butttons-score-button four'
                                    onClick={() => {
                                        if (currentSpot === cardsArr.length - 1) {
                                            handleSubmit(4, cardsArr[currentSpot]['id'])
                                            setAnswerRevealed(false)
                                        } else {
                                            handleSubmit(4, cardsArr[currentSpot]['id'])
                                            setCurrentSpot(currentSpot + 1)
                                            setAnswerRevealed(false)
                                        }
                                    }}
                                    value={4}

                                >
                                    4
                                    <div
                                        className='dashboard-right-browse-bottom-butttons-score-button-subtext'
                                    >
                                    </div>
                                </div>
                                <div
                                    className='dashboard-right-browse-bottom-butttons-score-button five'
                                    onClick={() => {
                                        if (currentSpot === cardsArr.length - 1) {
                                            handleSubmit(5, cardsArr[currentSpot]['id'])
                                            setAnswerRevealed(false)
                                        } else {
                                            handleSubmit(5, cardsArr[currentSpot]['id'])
                                            setCurrentSpot(currentSpot + 1)
                                            setAnswerRevealed(false)
                                        }
                                    }}
                                    value={5}
                                >
                                    5
                                    <div
                                        className='dashboard-right-browse-bottom-butttons-score-button-subtext'
                                    >
                                        Perfectly
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <div
                className='dashboard-right-browse-chevron'
            >
                {currentSpot < cardsArr.length - 1 && (<i
                    onClick={() => {
                        setCurrentSpot(currentSpot + 1)
                        setAnswerRevealed(false)
                    }}
                    className="fa-solid fa-chevron-right browsing-deck"
                ></i>)}
            </div>
        </div>
    ) : (
        null
    )
}

export default BrowsingDeck;
