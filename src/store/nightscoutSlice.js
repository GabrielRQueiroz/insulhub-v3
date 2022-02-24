import { createSlice } from '@reduxjs/toolkit';

export const nightscoutSlice = createSlice({
	name: 'nightscout',
	initialState: {
		nightscoutUrl: localStorage.getItem('nightscout_url'),
		isConnected: localStorage.nightscout_url ? true : false,
	},
	reducers: {
		connectUrl(prevState, { payload }) {
			localStorage.setItem('nightscout_url', payload);
			return { ...prevState, isConnected: true, nightscoutUrl: payload };
		},
		disconnectUrl(prevState) {
			localStorage.removeItem('nightscout_url');
			return { ...prevState, isConnected: false, nightscoutUrl: '' };
		},
	},
});

export const { connectUrl, disconnectUrl } = nightscoutSlice.actions;

export const getUrl = (state) => state.url;

export default nightscoutSlice.reducer;
