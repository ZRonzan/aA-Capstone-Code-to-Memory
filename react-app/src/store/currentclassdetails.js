// constants
const SET_CURRENT_CLASS_DETAILS = 'classes/SET_CURRENT_CLASS_DETAILS';
const SET_CURRENT_CLASS_MASTERY = 'classes/SET_CURRENT_CLASS_MASTERY';
const RESET_CURRENT_CLASS_DETAILS = 'classes/RESET_CURRENT_CLASS_DETAILS';

const setCurrentClass = (currClass) => ({
    type: SET_CURRENT_CLASS_DETAILS,
    currClass
});

const setCurrentClassMastery = (currClassMastery) => ({
    type: SET_CURRENT_CLASS_MASTERY,
    currClassMastery
})

const resetCurrentClass = (currClass) => ({
    type: RESET_CURRENT_CLASS_DETAILS,
    currClass
});

export const resetCurrentClassDetailsThunk = () => async (dispatch) => {
    const currClass = {}
    dispatch(resetCurrentClass(currClass))
}

export const getCurrentClassDetailsThunk = (classId) => async (dispatch) => {
    const response = await fetch(`/api/classes/${classId}`);

    if (response.ok) {
        const data = await response.json()
        dispatch(setCurrentClass(data))
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }
}


export const getCurrentClassMasteryThunk = (deckIds) => async (dispatch) => {
    const res = {
        totalCardsStudied: 0,
        masteryScore: 0
    }

    for (let deckId of deckIds) {
        const numDeckId = parseInt(deckId)
        const response = await fetch(`/api/mastery/deck/${numDeckId}`)

        if (response.ok) {
            const data = await response.json()
            res['totalCardsStudied'] += data['deck_scores'].length
            res['masteryScore'] += data['total_mastery_score']
        }
    }
    dispatch(setCurrentClassMastery(res))
}

export const createNewDeckThunk = (newDeck) => async (dispatch) => {
    const response = await fetch('/api/decks/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDeck)
    });


    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(data['class_id']))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editDeckThunk = (editedDeck, deckId) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedDeck)
    });


    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(data['class_id']))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteDeckThunk = (deckId, classId) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(classId))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

// cards within a deck

export const deleteCardThunk = (cardId, classId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(classId))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editCardThunk = (editedCard, cardId, classId) => async (dispatch) => {
    console.log("IN EDIT CARD THUNK")
    const response = await fetch(`/api/cards/${cardId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedCard)
    });

    console.log(classId)
    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(classId))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const createNewCardThunk = (newCard, classId) => async (dispatch) => {
    const response = await fetch('/api/cards/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCard)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(getCurrentClassDetailsThunk(classId))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

let initialState = { class: {}, decks: {}, mastery: { masteryScore: 0, totalCardsStudied: 0 } }

export default function reducer(state = initialState, action) {

    let newState;

    switch (action.type) {
        case RESET_CURRENT_CLASS_DETAILS:
            return { class: {}, decks: {}, mastery: { masteryScore: 0, totalCardsStudied: 0 } };
        case SET_CURRENT_CLASS_MASTERY:
            newState = { ...state }

            newState['mastery'] = action.currClassMastery
            return newState;
        case SET_CURRENT_CLASS_DETAILS:
            newState = { ...state };

            const classDetails = {
                ...action.currClass["class"]
            }
            delete classDetails.decks

            const classDecks = {}

            action.currClass.class.decks.forEach(ele => {
                classDecks[ele.id] = ele
            });

            newState["class"] = classDetails
            newState["decks"] = classDecks

            return newState;
        default:
            return state;
    }
}
