import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useWindowWidth, useWindowHeight } from '../../hooks';
import { MainWrapper } from './MainElements';

export const Main = ({ children }) => {
	const deviceHeight = useWindowHeight();
	const windowWidth = useWindowWidth();
	const [isMobile, setIsMobile] = useState();
	const [windowHeight, setWindowHeight] = useState(useWindowHeight());

	useLayoutEffect(() => {
		// Listening for page resize to identify mobile dimensions
		windowWidth < 900 ? setIsMobile(true) : setIsMobile(false);
	}, [windowWidth]);

	useEffect(() => {
		// Fixing the page height to the current device screen's height
		setWindowHeight(deviceHeight);
	}, [deviceHeight]);

	return (
		<MainWrapper height={windowHeight} mobile={isMobile}>
			{children}
		</MainWrapper>
	);
};
