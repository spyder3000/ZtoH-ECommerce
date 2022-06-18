import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

export const CategoryPreview = ({ title, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				<Link className="logo-container" to={title}>
					<span className="title">{title.toUpperCase()}</span>
				</Link>
			</h2>
			<div className="preview">
				{/* ignore 1st param (product) & just use 2nd param (index);  keep just the first 4 products  */}
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
