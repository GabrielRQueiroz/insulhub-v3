import { configureStore } from '@reduxjs/toolkit';
import nightscoutReducer from './nightscoutSlice';

export * from './nightscoutSlice';

export default configureStore({
	reducer: {
		url: nightscoutReducer,
	},
});
