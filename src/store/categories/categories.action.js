import CATEGORIES_ACTION_TYPES from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// Action Creator

export const setCategories = (categoriesArray) =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START); // no payload

export const fetchCategoriesSuccess = (categoriesArray) =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);

export const fetchCategoriesFailed = (error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error); // error is payload

export const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart());
	try {
		const categoriesArray = await getCategoriesAndDocuments("categories");
		dispatch(fetchCategoriesSuccess(categoriesArray));
		// dispatch(setCategories(categoriesArray));
	} catch (error) {
		dispatch(fetchCategoriesFailed(error));
	}
};
