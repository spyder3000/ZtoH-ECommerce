// where all of our redux stuff happens;  this is where we generate our store object

import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // by default in any web browser, this will be local storage

import logger from "redux-logger";
// import { loggerMiddleware } from "./middleware/logger";

import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const persistConfig = {
	key: "root", // 'root' says persist the whole thing
	storage: storage,
	// blacklist: ["user"], // because user is coming from auth state anyway -- not needed, could be a conflict
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// for redux displays in console for Google Chrome;  modify to only keep middleware if in development
//   .filter(Boolean) filters out anything that is false(instead of false will pass an empty array [])
const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	thunk,
].filter(Boolean);
// const middleWares = [loggerMiddleware]; // for redux displays in console for Google Chrome

// checks that a window object exists (will break otherwise if before window) and REdux Devtools Extension exists)
const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// will allow us to pass multiple middlewares;  pass multiple fns left to right
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// middlewares must be 3rd parameter;  ch 167 -- use persistedReducer instead of rootReducer
export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store); // will be imported into index.js
