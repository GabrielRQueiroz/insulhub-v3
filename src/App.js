import './config/transition.css';
import { GlobalStyle } from './config';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Sidebar, Main, NightscoutForm } from './components';

import { Summary, Home, Calculator, Food } from './pages';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	const location = useLocation();
	const nightscoutBaseUrl = localStorage.getItem('nightscout_url');

	return (
		<Provider store={store}>
			<GlobalStyle />
			{nightscoutBaseUrl === null && <NightscoutForm />}
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
		</Provider>
	);
}

export default App;
