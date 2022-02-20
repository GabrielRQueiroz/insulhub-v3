import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Main, NightscoutForm, Sidebar } from './components';
import { GlobalStyle } from './config';
import './config/transition.css';
import { Calculator, Food, Home, Summary } from './pages';
import { getUrl } from './store';

function App() {
	const [userNeedsUrl, setUserNeedsUrl] = useState();
	const { nightscoutUrl } = useSelector(getUrl);
	const location = useLocation();

	useEffect(() => {
		// ? This useEffect grants that, if the user change the nightscout url, it will be checked if the Login popup has to be prompted
		nightscoutUrl ? setUserNeedsUrl(false) : setUserNeedsUrl(true);
	}, [nightscoutUrl]);

	return (
		<>
			<GlobalStyle />
			{userNeedsUrl && <NightscoutForm />}
			<Sidebar />
			<Main>
				<TransitionGroup>
					<CSSTransition key={location.pathname} timeout={500} classNames='page'>
						<Routes location={location}>
							<Route path='/' element={<Home />} />
							<Route path='/summary' element={<Summary />} />
							<Route path='/calculator' element={<Calculator />} />
							<Route path='/food' element={<Food />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</Main>
		</>
	);
}

export default App;
