import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, useLocation } from 'react-router-dom'
import CreateNewDeckModal from '../CreateNewDeckModal/CreateNewDeckModal';
import DeleteDeckModal from '../DeleteDeckModal/DeleteDeckModal';
import "./DeckCard.css"


const DeckCard = ({ classId, myDeck, ownerId }) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const pathName = useLocation().pathname
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        console.log(myDeck.cards.length)
        setIsLoaded(true)
    }, [])

    useEffect(() => {
    }, [pathName])

    // if ((pathName === `/dashboard/${myClass['id']}`)) {
    //     history.push(`/dashboard/${myClass['id']}/decks`)
    // }


    return isLoaded && (
        <div
            className={`deck-card-container`}
        >
            <div className='deck-card-name-and-edit'>
                <NavLink
                    title="Check out this deck"
                    className='deck-card-nav-container'
                    to={`/dashboard/${classId}/decks/`}
                >
                    <div className='deck-card-name'>
                        {myDeck.name}
                    </div>
                    {myDeck['objective'] && (<div className='deck-card-undertext objective'>
                        {`Objective: ${myDeck['objective']}`}
                    </div>)}
                    <div className='deck-card-undertext'>
                        {`${myDeck['cards'].length} cards`}
                    </div>
                </NavLink>
                <div
                    style={{ visibility: `${user.id === ownerId ? "visible" : "hidden"}` }}
                    className='class-card-edit-delete-container'
                >
                    <i
                        title='edit or delete deck'
                        className="fa-solid fa-ellipsis deck-card"
                        onClick={() => setShowDropdown(!showDropdown)}
                    ></i>
                    {showDropdown && (
                        <>
                            <div className='edit-delete-deck-button'>
                                <CreateNewDeckModal myDeck={myDeck} />
                            </div>
                            <div className='edit-delete-deck-button'>
                                <DeleteDeckModal myDeck={myDeck} classId={classId}/>
                            </div>
                        </>
                    )}
                </div>

            </div>
            <div className='class-card-arrow'>
                <NavLink
                    title="Check out this deck"
                    className='deck-card-nav-container'
                    to={`/dashboard/${classId}/decks/`}
                >
                    <i class="fa-solid fa-chevron-right deck-card"></i>
                </NavLink>
            </div>
        </div>
    );
}

export default DeckCard;
