import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
// 'userData' is coming from the 'Register.js' component when a user submit form
export const registerUser = (userData, history) => (dispatch) => {
	// Hit the backend and wait for data
	axios
		.post("/api/users/register", userData)
		// redirect to login
		.then((res) => history.push("/login"))
		.catch((err) =>
			// dispatch is made available by thunk/use dispatch instead of return statement
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post("api/users/login", userData)
		.then((res) => {
			// Save to localStorage
			const { token } = res.data;
			// Set token to localStorage
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to extract user data which is present in the token that was in jwt.sign
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				// send along the user & token information
				payload: err.response.data,
			})
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty obj which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
