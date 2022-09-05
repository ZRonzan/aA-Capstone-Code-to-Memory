import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import DeleteClassForm from './DeleteClassForm';

function DeleteClassModal({myClass, setSortedClasses, classPage}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className='delete-class-button-x' title='Delete this class'>
                {!classPage &&(<i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-x class-card"
                >
                </i>)}
                {classPage &&(<i
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className="fa-solid fa-ellipsis class-page"
                >
                </i>)}
            </div>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="log-in">
                        <DeleteClassForm setShowModal={setShowModal} myClass={myClass} setSortedClasses={setSortedClasses}/>
                    </Modal>
                </>
            )}
        </>
    );
}

export default DeleteClassModal;
