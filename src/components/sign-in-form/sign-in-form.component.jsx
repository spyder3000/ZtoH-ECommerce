import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

import { getRedirectResult } from "firebase/auth";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		// setCurrentUser(user);	// removed ch 108 (using onAuthStateChange instead)
		await createUserDocumentFromAuth(user);
	};

	// input fields should reflect changes to user
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// destructure from response.user
			console.log(email, password);
			const { user } = await signInAuthUserWithEmailAndPassword({
				email,
				password,
			});
			// console.log(user);
			// setCurrentUser(user);  // removed ch 108 (using onAuthStateChange instead)
			resetFormFields();
		} catch (e) {
			if (e.code === "auth/wrong-password" || "auth/user-not-found") {
				alert("Incorrect user/password for email");
			} else {
				console.error(e);
			}
		}
	};

	// set <input name="" to the corresponding formFields value, so this will match in handleChange()
	//   <input value={}  corresponds to the destructured formFields above;  will be what user sees
	return (
		<div className="sign-up-container">
			<h2>I already have an account </h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};
export default SignInForm;
