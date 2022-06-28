import CATEGORIES_ACTION_TYPES from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
};

// ch 145 -- can sometimes use state object to derive next value (e.g. increment counter)
export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				categories: payload,
			};
		default:
			return state;
	}
};
