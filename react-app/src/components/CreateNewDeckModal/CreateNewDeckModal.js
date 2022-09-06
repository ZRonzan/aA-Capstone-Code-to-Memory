import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import CreateNewDeckForm from './CreateNewDeckForm.js'

function CreateNewDeckModal({ noClasses, myDeck }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='create-deck-button' title={myDeck? 'Edit deck':'Create a deck'}>
                {!noClasses && !myDeck? (<i
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
                        { !myDeck? "Create new deck" : "Edit deck"}
                    </button>
                )}
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <CreateNewDeckForm setShowModal={setShowModal} myDeck={myDeck} editing={myDeck? true:false}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default CreateNewDeckModal;
