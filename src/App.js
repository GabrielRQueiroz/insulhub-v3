import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Main, NightscoutForm, Sidebar } from './components';
import { GlobalStyle } from './config';
import './config/transition.css';
import { Calculator, Food, Home, Summary } from './pages';
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
