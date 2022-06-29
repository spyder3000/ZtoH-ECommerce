import { createSelector } from "reselect";

// returns current categories
const selectCategoryReducer = (state) => {
	console.log("selector 1 fired");
	return state.categories;
};

// creates a memoized selector;  output from selectCategoryReducer will be 1st param 'categoriesSlice'
//   if state.categories does not change, then selectCategoryReducer will not change & selectCategories will return cached data
export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => {
		console.log("selector 2 fired");
		return categoriesSlice.categories;
	}
);

// create category Map keyed by Title
// ch 162 - create memoized version of selectCategoriesMap (commented below);  only rerun if selectCategories has changed
export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => {
		console.log("selector 3 fired");
		return categories.reduce((acc, { title, items }) => {
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});
	}
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);
