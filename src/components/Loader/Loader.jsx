import React from 'react';
import { LoaderCenter, LoaderWrapper } from './LoaderStyle';

export const Loader = () => {
	return (
		<LoaderWrapper>
			<LoaderCenter color='rgba(55, 81, 255)' speedMultiplier={1.5} />
		</LoaderWrapper>
	);
};
