import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import CreateCardForm from './CreateCardForm.js'

function CreateCardModal({ noCards, myDeck }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='create-deck-button' title={myDeck? 'Edit deck':'Create a deck'}>
                {!noCards && !myDeck? (<i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-plus class-card"
                >
                </i>) : (
                    <button
                        className={`create-new-deck-modal-button ${myDeck? "edit-class-save-button edit-deck" : ""}`}
                        onClick={() => {
                            setShowModal(true)
                        }}
                        >
                        { !myDeck? "Create new Card" : "Edit card"}
                    </button>
                )}
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <CreateCardForm setShowModal={setShowModal} myDeck={myDeck} editing={myDeck? true:false}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default CreateCardModal;
