import * as actionTypes from "../actionTypes";

export const addUserData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_USER_DATA,
    }
}
export const clearUserData = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA,
    }
}
export const addUsersData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_USERS_DATA,
    }
}
export const clearUsersData = () => {
    return {
        type: actionTypes.CLEAR_USERS_DATA,
    }
}
export const addDetaileData = (payload) => {
    return {
        payload,
        type: actionTypes.ADD_DETAILE_DATA,
    }
}
export const clearDetaileData = () => {
    return {
        type: actionTypes.CLEAR_DETAILE_DATA,
    }
}