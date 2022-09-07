import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { getUserClassesThunk } from '../../store/currentuserclasses';
import { deleteCardThunk } from '../../store/currentclassdetails';

const DeleteCardForm = ({ setShowModal, myCard, classId }) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const history = useHistory()

    const currentClass = useSelector(state => state.currentclassdetails.class)

    const handleDelete = async () => {
        await dispatch(deleteCardThunk(myCard['id'], classId))
        await dispatch(getUserClassesThunk())
        setShowModal(false)
    }

    return (
        <>
            <div className='log-in-form-x-container'>
                <i className="fa-solid fa-xmark login" onClick={() => setShowModal(false)}></i>
            </div>
            <div className='delete-class-main-body'>
                <div className='delete-class-title'>
                    Caution
                </div>
                <div className='delete-class-message'>
                    {`Are you sure that you want to delete this Card from your deck? This action cannot be undone.`}
                </div>
            </div>
            <div className='delete-class-buttons-container'>
                <button
                    onClick={handleDelete}
                    className='log-in-form-submit-button'
                >
                    Yes, please proceed
                </button>
                <div
                    onClick={() => setShowModal(false)}
                    className='delete-class-form-cancel'
                >
                    No, cancel
                </div>
            </div>
        </>
    );
};

export default DeleteCardForm;
