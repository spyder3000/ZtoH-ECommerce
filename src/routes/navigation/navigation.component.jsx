import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";

// parent level component;  use Fragment if you don't want a wrapping div -- satisfies React's criteria of just one top-level components
const Navigation = () => {
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					<Link className="nav-link" to="/sign-in">
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
