// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth"; // getAuth used to create an auth instance

// fireStore governs our Database
import {
	getFirestore,
	doc, // allows us to retrieve documents from firestore;  doc will get you the document instance
	getDoc, // getting the document data
	setDoc, // set the document data
	collection,
	writeBatch,
	query,
	getDocs,
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

// e.g. collectionKey = 'category'
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db); // batch instance
	// can attach multiple set Events to batch

	// e.g. data for the 5 categories
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object); // Firebase will give us a docRef even if document doesnt exist on FB yet
	});

	await batch.commit();
	console.log("done");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q); // fetch the document snapshots we want

	// ch 157 -- modify to return just categories array (instead of category Map)
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()); // snapshots are the data itself
};

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
	// return userDocRef;
	return userSnapshot;

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

// what we're making is an Authenticated user w/in Firebase
export const signInAuthUserWithEmailAndPassword = async ({
	email,
	password,
}) => {
	if (!email || !password) return;
	console.log("firebase.utils", email, password);
	// will create an authenticated user & pass back an auth object
	console.log("auth = ", auth);
	let authObj = await signInWithEmailAndPassword(auth, email, password);
	console.log("return");
	console.log(authObj);
	return authObj;
};

// what we're making is an Authenticated user w/in Firebase
export const signOutUser = async () => {
	await signOut(auth);
};

// this fn returns whatever you get back from onAuthStateChange();  whenever you instantiate this
//    fn, you need to send a callback
// This functions as an always open Listener (for auth changes);  needs to close in user.context.jsx
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback); // e.g. when user signs in, signs out
