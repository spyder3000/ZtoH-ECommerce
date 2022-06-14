import { createContext, useState, useEffect } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value you want to access, both the curr value & the setter
export const UserContext = createContext({
	currentUser: null, // initial values for context (different from initial values of state below)
	setCurrentUser: () => null,
});

// e.g. to wrap around a component
export const UserProvider = ({ children }) => {
	// useState here will cause the components to re-render that use this property
	const [currentUser, setCurrentUser] = useState(null); // init value of null is for the state, different from context
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log(user); // user will be an authenticated user object OR null
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe; // runs when we unmount;  cleans up this method (to prevent memory leaks when no longer needed)
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
