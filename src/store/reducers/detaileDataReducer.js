import * as actionTypes from "../actionTypes";

const defaultDetaileData = []

const detaileDataReducer = (state = defaultDetaileData, action) => {
    const detaile = action?.payload;

    switch(action.type) {
        case actionTypes.ADD_DETAILE_DATA:{
            return detaile ? detaile : []
        }
        case actionTypes.CLEAR_DETAILE_DATA:{
            return defaultDetaileData;
        }
        default: {
            return state;
        }
    }

}

export default detaileDataReducer;