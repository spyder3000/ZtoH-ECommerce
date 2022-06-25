import ProductCard from "../product-card/product-card.component";

import {
	CategoryPreviewContainer,
	Title,
	Preview,
} from "./category-preview.styles";

export const CategoryPreview = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{/* ignore 1st param (product) & just use 2nd param (index);  keep just the first 4 products  */}
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
