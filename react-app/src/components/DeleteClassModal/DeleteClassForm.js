import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteUserClassThunk } from '../../store/currentuserclasses';
import { login } from '../../store/session';

const DeleteClassForm = ({ setShowModal, myClass }) => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteUserClassThunk(myClass['id']))
  }

  return (
    <>
      <div className='log-in-form-x-container'>
        <i className="fa-solid fa-xmark login" onClick={() => setShowModal(false)}></i>
      </div>
      <div>
        <div>
          Caution
        </div>
        <div>
          {`Are you sure that you want to Remove this class (${myClass['name']})from your library? This action cannot be undone.`}
        </div>
        <div>
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

      </div>
    </>
  );
};

export default DeleteClassForm;
