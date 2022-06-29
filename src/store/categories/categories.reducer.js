import CATEGORIES_ACTION_TYPES from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

// ch 145 -- can sometimes use state object to derive next value (e.g. increment counter)
export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		// case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				isLoading: true,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				categories: payload,
				isLoading: false,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				error: payload,
				isLoading: false,
			};
		default:
			return state;
	}
};
