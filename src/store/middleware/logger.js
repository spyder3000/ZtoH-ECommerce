// 3 fns that return from one another
export const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}
	console.log("type", action.type);
	console.log("payload", action.payload);
	console.log("currentState", store.getState());

	next(action); // async, so all reducers will run prior to following lines here
	console.log("next state", store.getState());
};
