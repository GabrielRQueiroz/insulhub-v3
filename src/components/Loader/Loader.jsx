import React from 'react';
import { LoaderCenter, LoaderWrapper } from './LoaderStyle';

export const Loader = ({ position, color, size, margin }) => {
	return (
		<LoaderWrapper>
			<LoaderCenter position={position} color={color || 'rgba(55, 81, 255)'} speedMultiplier={1.5} size={size} margin={margin} />
		</LoaderWrapper>
	);
};
