import './styles.css';
import { GlobalStyle } from './config';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Sidebar, Main } from './components';

import { Summary, Home, Calculator, Food } from './pages';

function App() {
	const location = useLocation();

	return (
		<>
			<GlobalStyle />
			<Sidebar />
			<Main>
				<TransitionGroup>
					<CSSTransition
						key={location.pathname}
						timeout={500}
						classNames='page'
					>
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
