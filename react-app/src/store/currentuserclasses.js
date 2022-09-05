// constants
const SET_USER_CLASSES = 'classes/SET_USER_CLASSES';

const setUserClasses = (classes) => ({
    type: SET_USER_CLASSES,
    classes
});

export const getUserClassesThunk = () => async (dispatch) => {
    const response = await fetch('/api/classes/current-user-classes');


    if (response.ok) {
        const data = await response.json()
        dispatch(setUserClasses(data))
        return data;
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const createUserClassThunk = (newClass) => async (dispatch) => {
    const response = await fetch('/api/classes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass)
    });


    if (response.ok) {
        const data = await response.json()
        dispatch(getUserClassesThunk())
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

export const editUserClassThunk = (editedClass, classId) => async (dispatch) => {
    const response = await fetch(`/api/classes/${classId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedClass)
    });


    if (response.ok) {
        dispatch(getUserClassesThunk())
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteUserClassThunk = (classId) => async (dispatch) => {
    const response = await fetch(`/api/classes/${classId}/delete`, {
        method: 'DELETE'
    });


    if (response.ok) {
        dispatch(getUserClassesThunk())
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

let initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_CLASSES:
            const newState = {};
            action.classes.classes.map((ele) => {
                newState[ele.id] = ele
            })
            return newState;
        default:
            return state;
    }
}
