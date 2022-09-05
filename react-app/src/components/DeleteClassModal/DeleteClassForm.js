import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { deleteUserClassThunk } from '../../store/currentuserclasses';
import './DeleteClassForm.css'

const DeleteClassForm = ({ setShowModal, myClass, setSortedClasses }) => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const history = useHistory()

  const handleDelete = async () => {
    const currentLocation = pathname.split("/")
    if (parseInt(currentLocation[2]) === parseInt(myClass['id'])) {
      await dispatch(deleteUserClassThunk(myClass['id']))
      setSortedClasses([])
      history.push('/dashboard')
      setShowModal(false)
    } else {
      setSortedClasses([])
      await dispatch(deleteUserClassThunk(myClass['id']))
      setShowModal(false)
    }
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
          {`Are you sure that you want to delete this class (${myClass['name']}) from your library? This action cannot be undone.`}
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

export default DeleteClassForm;
