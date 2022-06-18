import { Fragment, useContext } from "react";

import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils.js";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// import "./navigation.styles.jsx";
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from "./navigation.styles";

// parent level component;  use Fragment if you don't want a wrapping div -- satisfies React's criteria of just one top-level components
const Navigation = () => {
	// this will re-render at sign-in/sign-out due to useState() in user.context.jsx
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	// console.log(currentUser);
	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink className="nav-link" to="/auth">
							SIGN IN
						</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
