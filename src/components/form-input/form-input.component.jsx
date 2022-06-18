import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

// otherProps will contain all props for <input>
const FormInput = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{/* {label && (
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			)} */}
			<FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
		</Group>
	);
};

// alternative way of doing same thing
const FormInput88 = ({ label, inputOptions }) => {
	return (
		<div className="group">
			<input className="form-input" {...inputOptions} />
			{label && (
				<label
					className={`${
						inputOptions.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
