import "./button.styles.scss";

/* 3 types of buttons: 
   default  -- black (hover white)
   inverted -- white (hover black) 
   google sign in  -- blue 
*/

const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
