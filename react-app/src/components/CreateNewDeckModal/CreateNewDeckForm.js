import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createNewDeckThunk, editDeckThunk } from '../../store/currentclassdetails';
import { getUserClassesThunk } from '../../store/currentuserclasses';

const CreateNewDeckForm = ({ setShowModal, myDeck, editing, setShowDropdown }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([]);
  const [deckName, setDeckName] = useState("")
  const [deckObjective, setDeckObjective] = useState(null)
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector(state => state.session.user)
  const currentClass = useSelector(state => state.currentclassdetails)
  const { classId } = useParams()

  useEffect(() => {
    if (myDeck) {
      setDeckName(myDeck['name'])
      setDeckObjective(myDeck['objective'])
    }
    setIsLoaded(true)
  }, [])


  const handleCreate = async () => {
    let errors = []
    let newDeckName = deckName.trim()
    let newDeckObjective = deckObjective
    if (newDeckObjective) {
      newDeckObjective = newDeckObjective.trim()
    }
    if (newDeckName.length > 50) {
      errors.push("Deck name must be 50 characters or less.")
    }
    if (newDeckName.length === 0) {
      errors.push("Deck name is required")
    }
    if (newDeckObjective && newDeckObjective.length > 150) {
      errors.push("Deck objective must be less than or equal to 150 characters")
    }
    if (Number(classId) !== currentClass.class['id']) {
      errors.push("You should not be here...")
    }
    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    const newDeck = {
      "name": newDeckName,
      "objective": newDeckObjective,
      "class_id": currentClass.class['id']
    }
    await dispatch(createNewDeckThunk(newDeck))
    await dispatch(getUserClassesThunk())
    setShowModal(false)
    // history.push(`/dashboard/${currentClass.class['class_id']}`)
  }

  const handleEdit = async () => {
    let errors = []
    let editedDeckName = deckName.trim()
    let editedDeckObjective = deckObjective
    if (editedDeckObjective) {
      editedDeckObjective = editedDeckObjective.trim()
    }
    if (editedDeckName.length > 50) {
      errors.push("Deck name must be 50 characters or less.")
    }
    if (editedDeckName.length === 0) {
      errors.push("Deck name is required")
    }
    if (editedDeckObjective && editedDeckObjective.length > 150) {
      errors.push("Deck objective must be less than or equal to 150 characters")
    }
    if (Number(classId) !== currentClass.class['id']) {
      errors.push("You should not be here...")
    }
    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    const editedDeck = {
      "name": editedDeckName,
      "objective": editedDeckObjective,
      "class_id": currentClass.class['id']
    }
    const deckId = myDeck['id']
    await dispatch(editDeckThunk(editedDeck, deckId))
    setShowModal(false)
    // history.push(`/dashboard/${currentClass.class['class_id']}`)
  }

  const updateDeckName = (e) => {
    setErrors([])
    setDeckName(e.target.value);
  };

  const updateDeckObjective = (e) => {
    setErrors([])
    setDeckObjective(e.target.value);
  }

  return isLoaded && (
    <>
      <div className='log-in-form-x-container'>
        <i
          className="fa-solid fa-xmark login"
          onClick={() => {
            if(setShowDropdown) setShowDropdown(false)
            setShowModal(false)
          }}></i>
      </div>
      <div className='delete-class-main-body'>
        <div className='delete-class-title'>
          {`${editing ? "Edit deck" : "Create new deck"}`}
        </div>
        <div className='delete-class-message'>
          A Deck is a subset of Flashcards in a Class, similar to chapters in a book
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
      <div className='create-class-form-name-container deck-name'>
        Name:
        <input className='create-class-form-input-field deck-name'
          name='deck name'
          type='text'
          placeholder='(Deck Name Required) e.g. Git Commands, JS Data Types'
          value={deckName}
          onChange={updateDeckName}
        />
      </div>
      <div className='create-class-form-name-container deck-objective'>
        Objective:
        <textarea className='create-class-form-input-field deck-objective'
          name='class name'
          type='text'
          placeholder='(Objective not required). Provide a quick outline of what this deck aims to achieve'
          value={deckObjective}
          onChange={updateDeckObjective}
        />
      </div>
      <div className='delete-class-buttons-container'>
        <button
          onClick={() => {
            if(setShowDropdown) setShowDropdown(false)
            editing ? handleEdit() : handleCreate()
          }}
          className='log-in-form-submit-button'
        >
          {`${editing ? "Edit deck" : "Create new deck"}`}
        </button>
      </div>
    </>
  );
};

export default CreateNewDeckForm;
