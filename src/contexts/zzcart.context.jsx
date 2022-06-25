import { useEffect } from "react";
import { createContext, useState } from "react";

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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	// every time cartItems changes, run this function to re-calculate cartCount
	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	// every time cartItems changes, run this function to re-calculate cartTotal
	//  ** NOTE:  BEST practice – use just one useEffect() for each variable being governed (& not add to existing useEffect for cartCount
	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	// addCartItem() -- will return updated array of objects
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	// removeItemFromCart() -- will return updated array of objects
	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	// clearItemFromCart() -- will return updated array of objects
	const clearItemFromCart = (cartItemToDelete) => {
		setCartItems(clearCartItem(cartItems, cartItemToDelete));
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
