import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentClassDetailsThunk } from '../../store/currentclassdetails';
import CreateNewDeckModal from '../CreateNewDeckModal/CreateNewDeckModal';
import './DashboardRightDecks.css'
import DeckCard from '../DeckCard/DeckCard';

const DashboardRightDecks = () => {
    const [isLoaded, setIsLoaded] = useState()

    const dispatch = useDispatch()
    const history = useHistory()

    const { classId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)

    useEffect(() => {
        const getClassDetails = async () => {
            let data = await dispatch(getCurrentClassDetailsThunk(classId));
            setIsLoaded(true)
        }
        getClassDetails()
    }, [])

    // useEffect(() => {
    //     setIsLoaded(false)

    //     setIsLoaded(true)

    // }, [classId, userClasses])

    if (!user || !userClasses[classId]) {
        history.push('/404-not-found')
    }

    return isLoaded ? (
        <div className='dashboard-right-decks-container'>
            <div className='dashboard-right-decks-top'>
                <div className='dashboard-right-decks-header'>
                    DECKS
                </div>
                <div className='dashboard-right-decks-create-new-deck-container'>
                    <CreateNewDeckModal />
                </div>
            </div>
            <div className='dashboard-right-decks-list-container'>
                {Object.keys(currentClassDecks).length === 0 ? (
                    <div className='dashboard-right-no-decks-container'>
                        <div className='dashboard-right-no-decks-title'>
                            Add Decks to your Class
                        </div>
                        <div className='dashboard-right-no-decks-text'>
                            <span>Your Class has no Decks.</span> A Deck is a collection of Flashcards in a Class, similar to chapters in a book. Add a Deck to get started.
                        </div>
                        <div className='dashboard-right-no-decks-create-button'>
                            <CreateNewDeckModal noClasses={true} />
                        </div>
                    </div>
                ) : (
                    Object.values(currentClassDecks).sort((a, b) => a['id'] - b['id']).map((ele) => {
                        return (
                            <DeckCard myDeck={ele} classId={classId} ownerId={currentClassDetails['owner_id']} />

                        )
                    })
                )}
            </div>
        </div>
    ) : (
        null
    )
}

export default DashboardRightDecks;
