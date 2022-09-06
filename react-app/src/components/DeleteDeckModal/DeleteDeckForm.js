import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation,useHistory } from 'react-router-dom';
import { deleteDeckThunk } from '../../store/currentclassdetails';
import {getUserClassesThunk} from '../../store/currentuserclasses';

const DeleteDeckForm = ({ setShowModal, myDeck, classId}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const history = useHistory()

    const currentClass = useSelector(state => state.currentclassdetails.class)

    const handleDelete = async () => {
        await dispatch(deleteDeckThunk(myDeck['id'], classId))
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
                    {`Are you sure that you want to delete this deck (${myDeck['name']}) from your library? This action cannot be undone.`}
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

export default DeleteDeckForm;
