import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editCardThunk, createNewCardThunk } from '../../store/currentclassdetails';
import { getUserClassesThunk } from '../../store/currentuserclasses';
import './CreateCardForm.css'

const CreateCardForm = ({ setShowModal, myCard, editing }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([]);
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector(state => state.session.user)
  const currentClass = useSelector(state => state.currentclassdetails.class)
  const { deckId } = useParams()

  useEffect(() => {
    if (myCard) {
      setQuestion(myCard['question'])
      setAnswer(myCard['answer'])
    }
    setIsLoaded(true)
  }, [])


  const handleCreate = async () => {
    let errors = []
    let newQuestion = question.trim()
    let newAnswer = answer.trim()

    if (newQuestion.length > 500) {
      errors.push("Card question must be 500 characters or less.")
    }
    if (newQuestion.length === 0) {
      errors.push("Question is required")
    }
    if (newAnswer.length > 500) {
      errors.push("Card answer must be 500 characters or less.")
    }
    if (newAnswer.length === 0) {
      errors.push("Answer is required")
    }

    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    const newCard = {
      "question": newQuestion,
      "answer": newAnswer,
      "deck_id": deckId
    }

    await dispatch(createNewCardThunk(newCard, currentClass.id))
    await dispatch(getUserClassesThunk())
    setShowModal(false)
  }

  const handleEdit = async () => {
    let errors = []
    let editedQuestion = question.trim()
    let editedAnswer = answer.trim()

    if (editedQuestion.length > 500) {
      errors.push("Card question must be 500 characters or less.")
    }
    if (editedQuestion.length === 0) {
      errors.push("Question is required")
    }
    if (editedAnswer.length > 500) {
      errors.push("Card answer must be 500 characters or less.")
    }
    if (editedAnswer.length === 0) {
      errors.push("Answer is required")
    }

    if (errors.length > 0) {
      setErrors(errors)
      return
    }

    const editedCard = {
      "question": editedQuestion,
      "answer": editedAnswer,
      "deck_id": deckId
    }

    await dispatch(editCardThunk(editedCard, myCard.id, currentClass.id))
    await dispatch(getUserClassesThunk())
    setShowModal(false)
  }

  const updateQuestion = (e) => {
    setErrors([])
    setQuestion(e.target.value);
  };

  const updateAnswer = (e) => {
    setErrors([])
    setAnswer(e.target.value);
  };

  return isLoaded && (
    <>
      <div className='log-in-form-x-container'>
        <i className="fa-solid fa-xmark login" onClick={() => setShowModal(false)}></i>
      </div>
      <div className='delete-class-main-body'>
        <div className='delete-class-title'>
          {`${editing ? "Edit card" : "Create new card"}`}
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
        Question:
        <textarea
          className='create-class-form-input-field deck-objective card'
          name='question'
          type='text'
          placeholder='(Question Required)'
          value={question}
          onChange={updateQuestion}
        />
        <div
          style={{ color: question ? `${500 - question.length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem" , fontSize: "0.8rem"}}
        >
          {`Characters remaining: ${question ? 500 - question.length : 500}`}
        </div>
      </div>
      <div className='create-class-form-name-container deck-objective'>
        Answer:
        <textarea
          className='create-class-form-input-field deck-objective card'
          name='answer'
          type='text'
          placeholder='(Answer Required)'
          value={answer}
          onChange={updateAnswer}
        />
        <div
          style={{ color: answer ? `${500 - answer.length < 0 ? "red" : "inherit"}` : "inherit", paddingTop: "1rem", height: "1rem" , fontSize: "0.8rem"}}
        >
          {`Characters remaining: ${answer ? 500 - answer.length : 500}`}
        </div>
      </div>
      <div className='delete-class-buttons-container'>
        <button
          onClick={() => { editing ? handleEdit() : handleCreate() }}
          className='log-in-form-submit-button'
        >
          {`${editing ? "Edit card" : "Create new card"}`}
        </button>
      </div>
    </>
  );
};

export default CreateCardForm;
