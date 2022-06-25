import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value you want to access, both the curr value & the setter
export const UserContext = createContext({
	currentUser: null, // initial values for context (different from initial values of state below)
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

// ch 145 -- can sometimes use state object to derive next value (e.g. increment counter)
const userReducer = (state, action) => {
	const { type, payload } = action;
	console.log(action);

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state, // we're returning a new object, so we want to include all previous values
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

// e.g. to wrap around a component  -- ch 104
export const UserProvider = ({ children }) => {
	// useState here will cause the components to re-render that use this property
	// const [currentUser, setCurrentUser] = useState(null); // init value of null is for the state, different from context

	// ch 145 -- replace useState() with useReducer()
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state; // or could destructure directly in line above
	console.log(currentUser);

	const setCurrentUser = (user) => {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
	};

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
