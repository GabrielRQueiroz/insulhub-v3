import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Main, NightscoutForm, Sidebar } from './components';
import { GlobalStyle } from './config';
import './config/transition.css';
import { getUrl } from './store';

function App() {
	const [userNeedsUrl, setUserNeedsUrl] = useState();
	const { nightscoutUrl } = useSelector(getUrl);

	useEffect(() => {
		// ? This useEffect grants that, if the user change the nightscout url, it will be checked if the Login popup has to be prompted
		nightscoutUrl ? setUserNeedsUrl(false) : setUserNeedsUrl(true);
	}, [nightscoutUrl]);

	return (
		<>
			<GlobalStyle />
			{userNeedsUrl && <NightscoutForm />}
			<Sidebar />
			<Main />
		</>
	);
}

export default App;
