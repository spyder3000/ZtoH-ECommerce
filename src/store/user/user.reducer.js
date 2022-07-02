import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
	currentUser: null,
};

// ch 145 -- can sometimes use state object to derive next value (e.g. increment counter)
export const userReducer = (state = INITIAL_STATE, action = {}) => {
	const { type, payload } = action;
	console.log(action);

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			console.log("user.reducer.js", payload);
			return {
				...state, // we're returning a new object, so we want to include all previous values
				currentUser: payload,
			};
		default:
			return state;
	}
};
