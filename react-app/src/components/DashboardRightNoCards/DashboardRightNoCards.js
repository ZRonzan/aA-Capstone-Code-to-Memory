import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateCardModal from '../CreateCardModal/CreateCardModal';

const DashboardRightNoCards = ({ myCard, ownerId }) => {

    const [isLoaded, setIslLoaded] = useState()

    const { classId, deckId } = useParams()

    const user = useSelector(state => state.session.user)
    const userClasses = useSelector(state => state.currentuserclasses)
    const currentClassDetails = useSelector(state => state.currentclassdetails.class)
    const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
    const currentDeck = currentClassDecks[deckId]

    useEffect(() => {
        setIslLoaded(true)
    }, [])

    return currentClassDetails['owner_id'] === user.id ? (
        <div className='dashboard-right-no-classes-container'>
            <div className='dashboard-right-no-classes-title'>
                Add Cards to your Deck
            </div>
            <div className='dashboard-right-no-classes-subtitle'>
                Your deck is empty.
            </div>
            <div className='dashboard-right-no-classes-text'>
                You can create your own cards using the button below.
            </div>
            <div className='dashboard-right-no-classes-text'>
                <CreateCardModal noCards={true} myCard={myCard} />
            </div>
        </div>
    ) : (
        <div className='dashboard-right-no-classes-container'>
            <div className='dashboard-right-no-classes-title'>
                The owner has not added any cards to this deck yet
            </div>
            <div className='dashboard-right-no-classes-subtitle'>
                This deck is empty.
            </div>
            <div className='dashboard-right-no-classes-text'>
                Please wait for the deck owner to add cards to this deck.
            </div>
        </div>
    )
}

export default DashboardRightNoCards;
