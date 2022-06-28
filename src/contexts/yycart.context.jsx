import { useReducer, createContext } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

// return new array with modified cartItems / new cart item;  Note:  productToAdd does not include 'quantity'
const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	let finder = cartItems.findIndex((item) => item.id === productToAdd.id);
	// if found, increment quantity
	if (finder > -1) {
		return cartItems.map((cartItem, index) => {
			if (index === finder)
				return { ...cartItem, quantity: cartItem.quantity + 1 };
			else return cartItem;
		});
	} else {
		// return cartItems.push({ ...productToAdd, quantiry: 1 });
		return [...cartItems, { ...productToAdd, quantity: 1 }];
	}
};

// return new array with modified cartItems
const removeCartItem = (cartItems, cartItemToRemove) => {
	// find if cartItems contains cartItemToRemove
	let existingCartItem = cartItems.find(
		(item) => item.id === cartItemToRemove.id
	);

	// Decrement or delete (if modify from 1 to 0) for matched item
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((dat) => dat.id !== existingCartItem.id);
	} else {
		return cartItems.map((cartItem) => {
			return cartItem.id === existingCartItem.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem;
		});
	}
};

// return new array with modified cartItems
const clearCartItem = (cartItems, cartItemToRemove) => {
	// find if cartItems contains cartItemToRemove
	let existingCartItem = cartItems.find(
		(item) => item.id === cartItemToRemove.id
	);
	return cartItems.filter((dat) => dat.id !== existingCartItem.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
	addItemToCart: () => {},
	removeItemFromCart: () => {},
});

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

export const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

// ch 146 -- can sometimes use state object to derive next value (e.g. increment counter)
const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				...payload, // payload will contain cartItems, cartCount, cartTotal
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				isCartOpen: payload, // payload is just a boolean for this one
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { cartItems, isCartOpen, cartCount, cartTotal } = state;

	const updateCartItemsReducer = (newCartItems) => {
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			})
		);
	};

	/* --  ACTION CREATOR FUNCTIONS   -- */
	// ch 147 -- replace setCartItems with Reducer logic
	const addItemToCart = (productToAdd) => {
		// setCartItems(addCartItem(cartItems, productToAdd));
		const newCartItems = addCartItem(cartItems, productToAdd); // updated array of objects
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (cartItemToRemove) => {
		// setCartItems(removeCartItem(cartItems, cartItemToRemove));
		const newCartItems = removeCartItem(cartItems, cartItemToRemove); // updated array of objects
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToDelete) => {
		// setCartItems(clearCartItem(cartItems, cartItemToDelete));
		const newCartItems = clearCartItem(cartItems, cartItemToDelete); // updated array of objects
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};

	// value is what we want to expose in the Context
	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
