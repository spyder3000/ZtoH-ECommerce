import { createSelector } from "reselect";

// gives us Cart Slice
const selectCartReducer = (state) => state.cart;

// creates a memoized selector;  output from selectCartItemReducer will be 1st param 'cartItemSlice'
//   if state.cartItems does not change, then selectCartItemReducer will not change & selectCartItems will return cached data
export const selectCartItems = createSelector([selectCartReducer], (cart) => {
	console.log("selector 2 fired");
	return cart.cartItems;
});

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
	console.log("selector 2b fired");
	return cart.isCartOpen;
});

export const selectCartCount = createSelector(
	[selectCartItems],
	(cartItems) => {
		console.log("selector 2b fired");
		return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
	}
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(total, cartItem) => total + cartItem.quantity * cartItem.price,
		0
	)
);
