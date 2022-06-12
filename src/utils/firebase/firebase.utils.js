// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from "firebase/auth"; // getAuth used to create an auth instance

import {
	getFirestore,
	doc, // allows us to retrieve documents from firestore;  doc will get you the document instance
	getDoc, // getting the document data
	setDoc, // set the document data
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBT9YGYmECBp9wkHsKLk8z_IvZMvpg6BSk",
	authDomain: "crwn-clothing-db-987a3.firebaseapp.com",
	projectId: "crwn-clothing-db-987a3",
	storageBucket: "crwn-clothing-db-987a3.appspot.com",
	messagingSenderId: "837604074344",
	appId: "1:837604074344:web:1bf636b0fbc94dfde12cdd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // gives back provider instance;  new because we may might need multiple providers

provider.setCustomParameters({
	prompt: "select_account", // when someone interacts w/ our provider, we want to force them to select an account (what Google wants)
});

export const auth = getAuth(); // auth instance;  no 'new' keyword because we only need 1 authentication

// note that both of these are generic and you can use providers other than Google
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

export const db = getFirestore();

// async fn that receives some user Authentication object;
//   additionalInformation is because we sometimes do not get displayName in userAuth (ch 98);  default of {}
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	// 2nd param is collection;  3rd is unique identifier
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log("createUserDocumentFromAuth");
	console.log(userDocRef);

	// getDoc allows us methods to check if document exists, & then to create if not;  even if document does
	//    not exist, the userDocRef tells us where the document will go
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists()); // allows us methods to check document

	// if user data does not exist, create user
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	// returns existing OR just created userDocRef;
	return userDocRef;

	// if user data exists, return user data reference
};

// what we're making is an Authenticated user w/in Firebase
export const createAuthUserWithEmailAndPassword = async ({
	email,
	password,
}) => {
	if (!email || !password) return;

	// will create an authenticated user & pass back an auth object
	let authObj = await createUserWithEmailAndPassword(auth, email, password);
	console.log(authObj);
	return authObj;
};
