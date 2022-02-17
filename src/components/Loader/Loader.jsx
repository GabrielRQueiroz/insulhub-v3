import { CircularProgress } from '@mui/material';
import React from 'react';
import { LoaderWrapper } from './LoaderStyle';

export const Loader = ({ size }) => {
	return (
		<LoaderWrapper>
			<CircularProgress color='inherit' size={size} />
		</LoaderWrapper>
	);
};
