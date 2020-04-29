const SET_USER = 'SET-USER';

const initialState = {
    isAuth: false,
    username: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: action.isAuth,
                username: action.username,
            }
        default:
            return state;
    }
};

export const setUserAC = (isAuth, username) => ({type:SET_USER, isAuth, username});

export default appReducer;