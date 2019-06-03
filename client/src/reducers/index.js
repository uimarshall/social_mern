// 'index.js' is the rootReducer and its to bring 2gether all our Reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
	auth: authReducer,
	errors: errorReducer
});
