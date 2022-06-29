import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
	selectCategoriesMap,
	selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, CategoryTitle } from "./category.styles";

// URL will tell us which category we are using
const Category = () => {
	console.log("render/re-rendering category component");
	const { category } = useParams(); // to get ‘category’ value from URL parameters;
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	// only want to calculate products when category or categoriesMap changes
	// categoriesMap[category] will work because this defaults to empty array
	const [products, setProducts] = useState(categoriesMap[category]); // useState([]);

	useEffect(() => {
		console.log("effect fired calling setProducts");
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	// products && needed (as a safeguard) because categoriesMap is async so products not yet defined;
	return (
		<Fragment>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</Fragment>
	);
};

export default Category;
