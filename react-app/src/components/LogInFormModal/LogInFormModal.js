import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LogInForm from './LoginForm';

function LogInFormModal({ amountChanged }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={`log-in-button`}
            >
                Log In
            </button>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="edit-group">
                        <LogInForm setShowModal={setShowModal} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default LogInFormModal;
