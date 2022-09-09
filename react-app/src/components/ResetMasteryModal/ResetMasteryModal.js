import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ResetMasteryForm from './ResetMasteryForm';

function ResetMasteryModal({oneDeck}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
            onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
            }}
            className='reset-mastery-button' title='Reset your progress'>
                {`Reset your ${oneDeck? 'deck' : 'class'} progress`}
            </button>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <ResetMasteryForm setShowModal={setShowModal} oneDeck={oneDeck}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default ResetMasteryModal;
