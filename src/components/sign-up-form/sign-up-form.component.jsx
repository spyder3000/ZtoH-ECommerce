import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

import "./sign-up-form.styles.scss";

import { getRedirectResult } from "firebase/auth";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const { setCurrentUser } = useContext(UserContext); // whenever UserContext values change, this component will rerun
	console.log("hit");

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// async because it will generate a user document inside an external service
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			// destructure from response.user
			const { user } = await createAuthUserWithEmailAndPassword({
				email,
				password,
			});

			setCurrentUser(user); // capture user data & save in user Context (e.g. currentUser)

			// pass email & pwd into final document we're trying to generate, via createUserDocumentFromAuth
			//    which assumes email, password, & userName;  we only have email & pwd from user object though
			await createUserDocumentFromAuth(user, { displayName }); // displayName comes from formFields
			resetFormFields();
		} catch (e) {
			if (e.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.error("User creation encountered an error", e);
			}
		}
	};

	// for when text changes for any of the 4 fields
	const handleChange = (event) => {
		const { name, value } = event.target; // destructure to get event.target.name, event.target.value
		setFormFields({ ...formFields, [name]: value });
	};

	// set <input name="" to the corresponding formFields value, so this will match in handleChange()
	//   <input value={}  corresponds to the destructured formFields above;  will be what user sees
	return (
		<div className="sign-up-container">
			<h2>Don't have an account? </h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				{/* <FormInput88
					label="Display Name88"
					inputOptions={{
						type: "text",
						required: true,
						onChange: handleChange,
						name: "displayName",
						value: displayName,
					}}
				/> */}
				<FormInput
					label="Display Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>
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
				<FormInput
					label="Confirm Password"
					type="password"
					required
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
