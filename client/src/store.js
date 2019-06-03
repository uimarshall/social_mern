import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {};
/* Any Middleware we want to use should be put in a variable, e.g
'thunk'(middleware) is put into the array.*/
// The rootReducer is responsible for updating the central store
const middleware = [thunk];
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
export default store;
