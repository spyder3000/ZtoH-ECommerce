import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, CategoryTitle } from "./category.styles";

// URL will tell us which category we are using
const Category = () => {
	const { category } = useParams(); // to get ‘category’ value from URL parameters;
	const { categoriesMap } = useContext(CategoriesContext);

	// only want to calculate products when category or categoriesMap changes
	// categoriesMap[category] will work because this defaults to empty array
	const [products, setProducts] = useState(categoriesMap[category]); // useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	// products && needed (as a safeguard) because categoriesMap is async so products not yet defined;
	return (
		<Fragment>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</Fragment>
	);
};

export default Category;
