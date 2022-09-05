import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import CreateClassForm from './CreateClassForm';

function CreateClassModal({setSortedClasses}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='delete-class-button-x' title='Create this class'>
                <i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-plus class-card"
                >
                </i>
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <CreateClassForm setShowModal={setShowModal} setSortedClasses={setSortedClasses}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default CreateClassModal;
