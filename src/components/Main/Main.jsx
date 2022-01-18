import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { MainWrapper } from './MainElements';

export const Main = ({ children }) => {
	const [isMobile, setIsMobile] = useState();
	const [windowHeight, setWindowHeight] = useState();
	const windowWidth = useWindowWidth();

	useEffect(() => {
		// Listening for page resize to identify mobile dimensions
		windowWidth < 900 ? setIsMobile(true) : setIsMobile(false);
	}, [windowWidth]);

	useEffect(() => {
		// Fixing the page height to the current device screen's height
		setWindowHeight(window.innerHeight);
	}, []);

	return (
		<MainWrapper height={windowHeight} mobile={isMobile}>
			{children}
		</MainWrapper>
	);
};
