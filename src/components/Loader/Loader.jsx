import React from 'react';
import { LoaderCenter, LoaderWrapper } from './LoaderStyle';

export const Loader = ({ size, margin }) => {
	return (
		<LoaderWrapper>
			<LoaderCenter
				color='rgba(55, 81, 255)'
				speedMultiplier={1.5}
				size={size}
				margin={margin}
			/>
		</LoaderWrapper>
	);
};
