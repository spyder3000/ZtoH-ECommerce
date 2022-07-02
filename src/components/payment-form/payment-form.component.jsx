import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
	PaymentFormContainer,
	FormContainer,
	PaymentButton,
} from "./payment-form.styles";

// Can pass all data in form to Stripe
const PaymentForm = () => {
	// add useStripe hook
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e) => {
		e.preventDefault();

		// DO NOT proceed if either of these is not active
		if (!stripe || !elements) {
			return;
		}

		setIsProcessingPayment(true);

		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());

		// client secret is returned from Stripe for our intention to pay -- will be sent with actual payment details
		console.log(response);
		const client_secret = response.paymentIntent.client_secret;
		// const { paymentIntent: { client_secret } } = response;   // same logic but additional restructuring
		console.log(client_secret);

		// Create the actual payment
		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : "Guest",
				},
			},
		});

		setIsProcessingPayment(false);

		console.log("currentUser = ", currentUser);
		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				alert("payment successful");
			}
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment</h2>
				<CardElement />
				<PaymentButton
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay Now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
