import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { createUserClassThunk, deleteUserClassThunk } from '../../store/currentuserclasses';
import './CreateClassForm.css'

const CreateClassForm = ({ setShowModal, setSortedClasses }) => {
  const [errors, setErrors] = useState([]);
  const [className, setClassName] = useState("")
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const handleCreate = async () => {
    let errors = []
    let newClassName = className.trim()
    if (newClassName.length > 50) {
      errors.push("Class name must be 50 characters or less.")
    }
    if (newClassName.length === 0) {
      errors.push("Class name is required")
      setClassName("")
    }
    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    const newClass = {
      "name": newClassName,
      "purpose": null,
      "headline": null,
      "description": null,
      "private": false,
      "owner_id": user.id
    }
    await dispatch(createUserClassThunk(newClass))
    setSortedClasses([])
    setShowModal(false)
    history.push('/dashboard')
  }

  const updateClassName = (e) => {
    setErrors([])
    setClassName(e.target.value);
  };

  return (
    <>
      <div className='log-in-form-x-container'>
        <i className="fa-solid fa-xmark login" onClick={() => setShowModal(false)}></i>
      </div>
      <div className='delete-class-main-body'>
        <div className='delete-class-title'>
          Create New Class
        </div>
        <div className='delete-class-message'>
          A Class is a set of Flashcards, grouped into Decks
        </div>
        {errors.length > 0 && (<div className='log-in-form-errors login'>
          <div
            className='log-in-form-errors login inner'
          >
            {errors.map((error, ind) => (
              <div key={ind} className="log-in-error">{error}</div>
            ))}
          </div>
        </div>)}
      </div>
      <div className='create-class-form-name-container'>
        <input className='create-class-form-input-field'
          name='class name'
          type='text'
          placeholder='(Class name Required)'
          value={className}
          onChange={updateClassName}
        />
      </div>
      <div
        className='create-class-characters-remaining'
        style={{ color: className ? `${50 - className.trim().length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem", fontSize: "0.8rem" }}
      >
        {`Characters remaining: ${className.trim() ? 50 - className.trim().length : 50}`}
      </div>
      <div
      className='create-characters-remaining'
      style={{ color: className ? `${50 - className.trim().length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem", fontSize: "0.8rem" }}
      >
        (Note: all spaces at the beginning and end of this class name will be removed upon creation)
      </div>
      <div className='delete-class-buttons-container'>
        <button
          onClick={handleCreate}
          className='log-in-form-submit-button'
        >
          Create my class
        </button>
      </div>
    </>
  );
};

export default CreateClassForm;
