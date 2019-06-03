import { GET_ERRORS } from "../actions/types";
const initState = {};
// The 'user' obj is available once the form is submitted
export default (state = initState, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
