import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { MainWrapper } from './MainElements';

export const Main = ({ children }) => {
	const [isMobile, setIsMobile] = useState();
	const [windowHeight, setWindowHeight] = useState();
	const windowWidth = useWindowWidth();

	useEffect(() => {
		windowWidth < 900 ? setIsMobile(true) : setIsMobile(false);
	}, [windowWidth]);

	useEffect(() => {
		setWindowHeight(window.innerHeight);
	}, []);

	return (
		<MainWrapper height={windowHeight} mobile={isMobile}>
			{children}
		</MainWrapper>
	);
};
