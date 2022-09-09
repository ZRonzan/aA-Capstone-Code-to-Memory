import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentClassMasteryThunk } from '../../store/currentclassdetails';
import './ResetMasteryForm.css'

const ResetMasteryForm = ({ setShowModal, oneDeck }) => {
  const [errors, setErrors] = useState([]);

  const currentClassName = useSelector(state => state.currentclassdetails.class.name)
  const currentClassDecks = useSelector(state => state.currentclassdetails.decks)
  const allDeckIds = Object.keys(currentClassDecks)

  const dispatch = useDispatch()

  const handleDelete = async (deckIds = allDeckIds) => {

    for (let deckId of deckIds) {
      const response = await fetch(`/api/mastery/deck/${deckId}`)

      if (response.ok) {
        const data = await response.json()
        for (let row of data.deck_scores) {
          await fetch(`/api/mastery/${row.id}/delete`, {
            method: 'DELETE'
          });
        }

      }
      dispatch(getCurrentClassMasteryThunk(deckIds))
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
          {oneDeck? `Are you sure that you want to reset your progress for this deck? ( ${oneDeck.name} )`: `Are you sure that you want to reset your progress for this class? ( ${currentClassName} )`}
        </div>
      </div>
      <div className='delete-class-buttons-container'>
        <button
          onClick={() => !oneDeck ? handleDelete() : handleDelete([oneDeck.id])}
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

export default ResetMasteryForm;
