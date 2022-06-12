import "./form-input.styles.scss";

// otherProps will contain all props for <input>
const FormInput = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
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
