import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import DeleteDeckForm from './DeleteDeckForm';

function DeleteDeckModal({ myDeck, classId, setShowDropdown }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='delete-class-button-x' title='Delete this class'>
                <button
                    onClick={() => setShowModal(true)}
                    className='edit-class-save-button delete-deck'
                >
                    Delete Deck
                </button>
            </div>
            {showModal && (
                <>
                    <Modal
                        onClose={() => {
                            if (setShowDropdown) setShowDropdown(false)
                            setShowModal(false)
                        }}
                        formType="log-in"
                    >
                        <DeleteDeckForm setShowModal={setShowModal} classId={classId} myDeck={myDeck} setShowDropdown={setShowDropdown}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default DeleteDeckModal;
