import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import DeleteClassForm from './DeleteClassForm';

function DeleteClassModal({myClass}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='splash-page-navbar-button log-in'>
                <i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-x class-card"
                >
                </i>
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <DeleteClassForm setShowModal={setShowModal} myClass={myClass} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default DeleteClassModal;
