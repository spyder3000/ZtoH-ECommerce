import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";

import { setCategories } from "../../store/categories/categories.action";
// import { getCategoriesMap } from "../../store/categories/category.selector";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
	const dispatch = useDispatch();
	console.log("SHOP PAGE");
	useEffect(() => {
		const getCategoriesMap = async () => {
			// const categoryMap  = await getCategoriesAndDocuments("categories");
			console.log("INIT CAT MAP 0");
			const categoriesArray = await getCategoriesAndDocuments("categories");
			console.log("INIT CAT MAP");
			console.log(categoriesArray);
			dispatch(setCategories(categoriesArray));
		};

		getCategoriesMap();
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
