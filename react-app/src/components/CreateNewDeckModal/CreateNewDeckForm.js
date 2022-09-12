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
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector(state => state.session.user)
  const currentClass = useSelector(state => state.currentclassdetails)
  const { classId } = useParams()

  useEffect(() => {
    if (myDeck) {
      console.log("SETTING DECKNAME", myDeck.name)
      setDeckName(myDeck['name'])
      setDeckObjective(myDeck['objective'])
    }
    setIsLoaded(true)
  }, [])


  useEffect(() => {
    // setHasSubmitted(false)
    // let errors = []
    // let editedDeckName = deckName.trim()
    // let editedDeckObjective = deckObjective

    // if (editedDeckObjective) {
    //   editedDeckObjective = editedDeckObjective.trim()
    // }
    // if (editedDeckName.length > 50) {
    //   errors.push("Deck name must be 50 characters or less.")
    // }
    // if (editedDeckName.length === 0) {
    //   errors.push("Deck name is required")
    // }
    // if (editedDeckObjective && editedDeckObjective.length > 100) {
    //   errors.push("Deck objective must be less than or equal to 100 characters")
    // }
    // if (Number(classId) !== currentClass.class['id']) {
    //   errors.push("You should not be here...")
    // }
    // if (errors.length > 0) {
    //   setErrors(errors)
    // }
  }, [deckName, deckObjective])

  const handleCreate = async (e) => {
    e.preventDefault()
    // setHasSubmitted(true)
    let errors = []
    let newDeckName = deckName.trim()
    let newDeckObjective = deckObjective
    if (deckObjective) newDeckObjective = deckObjective.trim()

    if (newDeckName.length > 50) {
      errors.push("Deck name must be 50 characters or less.")
    }
    if (newDeckName.length === 0) {
      errors.push("Deck name is required")
    }
    if (newDeckObjective && newDeckObjective.length > 100) {
      errors.push("Deck objective must be less than or equal to 100 characters")
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
      "objective": newDeckObjective ? newDeckObjective : null,
      "class_id": currentClass.class['id']
    }
    console.log(newDeck)
    await dispatch(createNewDeckThunk(newDeck))
    await dispatch(getUserClassesThunk())
    setShowModal(false)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    // setHasSubmitted(true)
    let errors = []

    let editedDeckName = deckName.trim()

    let editedDeckObjective = deckObjective
    if (editedDeckObjective) editedDeckObjective = editedDeckObjective.trim()


    if (editedDeckObjective) {
      editedDeckObjective = editedDeckObjective.trim()
    }
    if (editedDeckName.length > 50) {
      errors.push("Deck name must be 50 characters or less.")
    }
    if (editedDeckName.length === 0) {
      errors.push("Deck name is required")
    }
    if (editedDeckObjective && editedDeckObjective.length > 100) {
      errors.push("Deck objective must be less than or equal to 100 characters")
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
      "objective": editedDeckObjective === "" ? null : editedDeckObjective,
      "class_id": currentClass.class['id']
    }
    const deckId = myDeck['id']
    await dispatch(editDeckThunk(editedDeck, deckId))
    setShowDropdown(false)
    setShowModal(false)
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
            if (setShowDropdown) setShowDropdown(false)
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
        <div
          style={{ color: deckName ? `${50 - deckName.length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem", fontSize: "0.8rem" }}
        >
          {`Characters remaining: ${deckName ? 50 - deckName.length : 50}`}
        </div>
      </div>
      <div className='create-class-form-name-container deck-objective'>
        Objective:
        <input className='create-class-form-input-field deck-objective'
          name='class name'
          type='text'
          placeholder='(Objective not required). Provide a quick outline of what this deck aims to achieve'
          value={deckObjective}
          onChange={updateDeckObjective}
        />
        <div
          style={{ color: deckObjective ? `${100 - deckObjective.trim().length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem", fontSize: "0.8rem" }}
        >
          {`Characters remaining: ${deckObjective ? 100 - deckObjective.trim().length : 100}`}
        </div>
        <div
          className='create-characters-remaining'
          style={{paddingTop: "1rem", fontSize: "0.8rem" }}
        >
          (Note: all spaces at the beginning and end of the provided deck name and objective will be removed upon creation)
        </div>
      </div>
      <div className='delete-class-buttons-container'>
        <button
          onClick={(e) => {
            e.stopPropagation()
            editing ? handleEdit(e) : handleCreate(e)
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
