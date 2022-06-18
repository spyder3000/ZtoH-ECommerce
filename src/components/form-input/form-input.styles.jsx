// css block - allows us to encapsulate css in a block that we can use as a variable;
//   convert from sass variable to regular js variable
import styled, { css } from "styled-components";

// $sub-color: grey;
// $main - color: black;
const subColor = "grey";
const mainColor = "black";

// @mixin shrinkLabel {
// 	top: -14px;
// 	font-size: 12px;
// 	color: $main-color;
// }

const shrinkLabelStyles = css`
	top: -14px;
	font-size: 12px;
	color: ${mainColor};
`;

// convert .form-input-label because this is referenced/targeted elsewhere
export const FormInputLabel = styled.label`
	color: ${subColor}; /* interpolation - wrap variables as this is part of string */
	font-size: 16px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 10px;
	transition: 300ms ease all;

	${
		"" /* &.shrink {
			@include shrinkLabel();
		} */
	}
	/* access the props directly -- a boolean that adds in this style when true */
		${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
	background: none;
	background-color: white;
	color: ${subColor};
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid ${subColor};
	margin: 25px 0;

	&:focus {
		outline: none;
	}

	/* When you focus on input, find the nearest sibling (form-input-label) */
	${
		"" /* &:focus ~ .form-input-label {
			@include shrinkLabel();
		} */
	}
	&:focus ~ ${FormInputLabel} {
		${shrinkLabelStyles};
	}
`;

export const Group = styled.div`
	position: relative;
	margin: 45px 0;

	input[type="password"] {
		letter-spacing: 0.3em;
	}
`;
