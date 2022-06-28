import CART_ACTION_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
// import { useSelector } from "react-redux";
// import { selectCartItems } from "./cart/cart.selector";

// HELPER functions
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

// ACTION CREATORS
export const setIsCartOpen = (boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

/* --  ACTION CREATOR FUNCTIONS   -- */
// ch 147 -- replace setCartItems with Reducer logic
export const addItemToCart = (cartItems, productToAdd) => {
	// setCartItems(addCartItem(cartItems, productToAdd));
	const newCartItems = addCartItem(cartItems, productToAdd); // updated array of objects
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	// setCartItems(removeCartItem(cartItems, cartItemToRemove));
	const newCartItems = removeCartItem(cartItems, cartItemToRemove); // updated array of objects
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToDelete) => {
	// setCartItems(clearCartItem(cartItems, cartItemToDelete));
	const newCartItems = clearCartItem(cartItems, cartItemToDelete); // updated array of objects
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
