import { createContext, useState, useEffect } from "react";

// import {
// 	onAuthStateChangedListener,
// 	createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";

import PRODUCTS from "../shop-data.json";

// the actual value you want to access, both the curr value & the setter
export const ProductsContext = createContext({
	products: [], // initial values for context (different from initial values of state below)
	setProducts: () => [],
});

// e.g. to wrap around a component
export const ProductsProvider = ({ children }) => {
	// useState here will cause the components to re-render that use this property
	const [products, setProducts] = useState(PRODUCTS); // init value of null is for the state, different from context
	const value = { products, setProducts };

	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChangedListener((user) => {
	// 		console.log(user); // user will be an authenticated user object OR null
	// 		if (user) {
	// 			createUserDocumentFromAuth(user);
	// 		}
	// 		setCurrentUser(user);
	// 	});
	// 	return unsubscribe; // runs when we unmount;  cleans up this method (to prevent memory leaks when no longer needed)
	// }, []);

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
