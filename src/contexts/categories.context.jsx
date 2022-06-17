import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import PRODUCTS from "../shop-data.json";
// import SHOP_DATA from "../shop-data.js";

// the actual value you want to access, both the curr value & the setter
export const CategoriesContext = createContext({
	categoriesMap: {}, // an empty map is typically the empty state of a map -- {} in this case
});

// e.g. to wrap around a component
export const CategoriesProvider = ({ children }) => {
	// useState here will cause the components to re-render that use this property
	const [categoriesMap, setCategoriesMap] = useState({});

	// note that async is inside the useEffect;  do not use async on useEffect itself
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			console.log("categoryMap = ");
			console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	// One-TIME run to populate database
	// useEffect(() => {
	// 	addCollectionAndDocuments("categories", SHOP_DATA);
	// }, []);

	const value = { categoriesMap };

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
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
