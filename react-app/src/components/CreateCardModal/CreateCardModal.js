import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import CreateCardForm from './CreateCardForm.js'

function CreateCardModal({ noCards, myCard }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='create-deck-button' title={myCard ? 'Edit card' : 'Create a card'}>
                {!noCards && !myCard ? (<i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-plus class-card"
                >
                </i>) : noCards && !myCard ? (
                    <button
                        className={`create-new-deck-modal-button`}
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        Create new Card
                    </button>
                ) : (
                    <i
                        onClick={() => {
                            setShowModal(true)
                        }}
                        className="fa-solid fa-pencil edit-card"
                    ></i>
                )}
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <CreateCardForm setShowModal={setShowModal} myCard={myCard} editing={myCard ? true : false} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default CreateCardModal;
