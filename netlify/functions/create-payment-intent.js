// Netlify uses AWS Lambda functions under the hood (for serverless functions)
// Netlify will look in this functions folder & will identify any .js files in netlify\functions
//   and will include these in the Build step;  can then serve up these functions whenever requested

require("dotenv").config(); // import dotenv & config will attach secret vars in env to our process environment

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	// make a payment attempt to stripe -- need currency, payment method, & amount
	try {
		const { amount } = JSON.parse(event.body);
		// request to stripe server to try to make a payment
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "usd",
			payment_method_types: ["card"],
		});
		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent }),
		};
	} catch (error) {
		console.log({ error });

		return {
			status: 400,
			body: JSON.stringify({ error }),
		};
	}
};
