import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
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

	return (
		<AuthenticationContainer>
			{/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
			{/* <button onClick={signInWithGoogleRedirect}>
				Sign in with Google Redirect
			</button> */}
			<SignInForm />
			<SignUpForm />
		</AuthenticationContainer>
	);
};

export default Authentication;
