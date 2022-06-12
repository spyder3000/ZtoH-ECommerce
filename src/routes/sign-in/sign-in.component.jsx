import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
	// response will run once upon remounting (e.g. after return from signInWithGoogleRedirect)
	//   used for example purposes -- commented here as unneeded
	// useEffect(() => {
	// 	(async () => {
	// 		const response = await getRedirectResult(auth);
	// 		console.log("useEFFEct", response);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	})();
	// }, []);

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user);
		const userDocRef = createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			{/* <button onClick={signInWithGoogleRedirect}>
				Sign in with Google Redirect
			</button> */}
			<SignUpForm />
		</div>
	);
};

export default SignIn;
