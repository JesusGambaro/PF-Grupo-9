import rootReducer from "../reducers/reducer";
import adminReducer from "../reducers/adminReducer";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({root: rootReducer, admin: adminReducer}),
  applyMiddleware(thunk)
);
export default store;
