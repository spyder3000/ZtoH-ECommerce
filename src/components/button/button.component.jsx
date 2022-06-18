// import "./button.styles.scss";
import {
	BaseButton,
	GoogleSignInButton,
	InvertedButton,
} from "./button.styles";

/* 3 types of buttons: 
   default  -- black (hover white)
   inverted -- white (hover black) 
   google sign in  -- blue 
*/

export const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

// should take buttonType string, & return back 1 of 3 Button Type Components;  default buttonType is base
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
