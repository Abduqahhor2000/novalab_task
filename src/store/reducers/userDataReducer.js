import * as actionTypes from "../actionTypes";

const defaultUserData = {} 

const userDataReducer = (state = defaultUserData, action) => {
    const user = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_USER_DATA:{
            return user ? user : {}
        }
        case actionTypes.CLEAR_USER_DATA:{
            return defaultUserData;
        }
        default: {
            return state;
        }
    }

}

export default userDataReducer;