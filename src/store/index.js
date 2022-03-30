import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger';
import thunk from "redux-thunk";
import userDataReducer from "./reducers/userDataReducer";
import usersDataReducer from "./reducers/usersDataReducer";
import detaileDataReducer from "./reducers/detaileDataReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "users", "detaile"],
}
const rootReducer = combineReducers({
    user: userDataReducer,
    users: usersDataReducer,
    detaile: detaileDataReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
  
export const persistor = persistStore(store);
export default store;