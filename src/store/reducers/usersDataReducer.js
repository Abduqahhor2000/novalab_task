import * as actionTypes from "../actionTypes";

const defaultUsersData = [] 

const usersDataReducer = (state = defaultUsersData, action) => {
    const users = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_USERS_DATA:{
            return users ? users : []
        }
        case actionTypes.CLEAR_USERS_DATA:{
            return defaultUsersData;
        }
        default: {
            return state;
        }
    }

}

export default usersDataReducer;