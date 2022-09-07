import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal.js'

import './PreviewCard.css'

const PreviewCard = ({ card, number, mastery }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    if (!user || !card) {
        history.push('/404-not-found')
    }

    return isLoaded ? (
        <div className='preview-card-main-container'>
            <div className='preview-card-number'>
                {number}
            </div>
            <div className='preview-card-card-container outer'>
                <div className={`preview-card-card-container inner ${mastery}`}>
                    <div className='preview-card-question'>
                        <div className='preview-card-q-a'>
                            Q
                        </div>
                        <div className='preview-card-text-inner'>
                            {card.question}
                        </div>
                    </div>
                    <div className='preview-card-answer'>
                        <div className='preview-card-q-a'>
                            A
                        </div>
                        <div className='preview-card-text-inner'>
                            {card.answer}
                        </div>
                    </div>
                </div>
            </div>
            <div

                className='preview-card-edit-delete'
            >
                <DeleteCardModal myCard={card} />
            </div>
        </div>
    ) : (
        null
    )
}

export default PreviewCard;
