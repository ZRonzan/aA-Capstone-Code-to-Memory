// constants
const SET_CURRENT_CLASS_DETAILS = 'classes/SET_CURRENT_CLASS_DETAILS';

const setCurrentClass = (currClass) => ({
    type: SET_CURRENT_CLASS_DETAILS,
    currClass
});

export const getCurrentClassDetailsThunk= (classId) => async (dispatch) => {
    const response = await fetch(`/api/classes/${classId}`);


    if (response.ok) {
        const data = await response.json()
        dispatch(setCurrentClass(data))
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }

}

let initialState = {class:{}, decks: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_CLASS_DETAILS:
            const newState = {class: {}, decks:{}};

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
