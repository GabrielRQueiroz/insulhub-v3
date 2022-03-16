import { CircularProgress } from '@mui/material';
import React from 'react';
import { LoaderWrapper } from './LoaderStyle';

export const Loader = ({ size, noPadding }) => {
	return (
		<LoaderWrapper noPadding={noPadding}>
			<CircularProgress color='inherit' size={size} />
		</LoaderWrapper>
	);
};
