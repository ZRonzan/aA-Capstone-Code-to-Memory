import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCardForm from './DeleteCardForm';

function DeleteCardModal({ myCard, classId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='delete-card-button' title='Delete this class'>
                <i
                    title="delete this card"
                    class="fa-regular fa-trash-can delete-card"
                    onClick={() => setShowModal(true)}
                ></i>
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <DeleteCardForm setShowModal={setShowModal} classId={classId} myCard={myCard} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default DeleteCardModal;
