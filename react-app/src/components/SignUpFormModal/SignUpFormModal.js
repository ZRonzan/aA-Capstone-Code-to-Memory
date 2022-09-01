import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ amountChanged }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={`get-started-button`}
            >
                Get Started
            </button>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="edit-group">
                        <SignUpForm setShowModal={setShowModal} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default SignUpFormModal;
