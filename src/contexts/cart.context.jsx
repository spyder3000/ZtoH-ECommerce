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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	cartCount: 0,
	addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	// every time cartItems changes, run this function to re-calculate cartCount
	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	// addCartItem() -- will return updated array of objects
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	// value is what we want to expose in the Context
	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
