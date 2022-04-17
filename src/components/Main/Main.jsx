import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useWindowHeight, useWindowWidth } from '../../hooks';
import { Calculator, Food, Home, Summary } from '../../pages';
import { MainWrapper } from './MainElements';

export const Main = () => {
	const deviceHeight = useWindowHeight();
	const windowWidth = useWindowWidth();
	const [isMobile, setIsMobile] = useState();
	const [windowHeight, setWindowHeight] = useState(useWindowHeight());
	const location = useLocation();

	useLayoutEffect(() => {
		// Listening for page resize to identify mobile dimensions
		windowWidth < 900 ? setIsMobile(true) : setIsMobile(false);
	}, [windowWidth]);

	useEffect(() => {
		// Fixing the page height to the current device screen's height
		setWindowHeight(deviceHeight);
	}, [deviceHeight]);

	return (
		<MainWrapper aria-labelledby='Seção principal' role='main' height={windowHeight} mobile={isMobile}>
			<TransitionGroup>
				<CSSTransition key={location.pathname} timeout={250} classNames='page'>
					<Routes location={location}>
						<Route path='/' element={<Home />} />
						<Route path='/summary' element={<Summary />} />
						<Route path='/calculator' element={<Calculator />} />
						<Route path='/food' element={<Food />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</MainWrapper>
	);
};
