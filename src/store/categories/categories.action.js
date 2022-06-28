import CATEGORIES_ACTION_TYPES from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Action Creator

export const setCategories = (categoriesArray) =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
