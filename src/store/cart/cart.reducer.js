import CART_ACTION_TYPES from "./cart.types";

export const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

// ch 146 -- can sometimes use state object to derive next value (e.g. increment counter)
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				cartItems: payload, // payload will contain just cartItems (cartCount & cartTotal will be calculated in selector)
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				isCartOpen: payload, // payload is just a boolean for this one
			};
		default:
			return state;
	}
};
