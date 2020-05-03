import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading);
	axios
		.get("/api/profile")
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: {}, //sign in but no profile should return empty profile
			})
		);
};

// Profile Loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING, //tell reducer that profile is loading
	};
};
// Clear Profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};
