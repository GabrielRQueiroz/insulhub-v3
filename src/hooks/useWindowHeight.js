import { useState, useEffect } from 'react';

export function useWindowHeight() {
	const isWindowClient = typeof window === 'object';

	const [windowHeight, setWindowHeight] = useState(
		isWindowClient ? window.innerHeight : undefined
	);

	useEffect(() => {
		const setHeight = () => {
			setWindowHeight(window.innerHeight);
		};

		if (isWindowClient) {
			window.addEventListener('resize', setHeight);

			return () => window.removeEventListener('resize', setHeight);
		}
	}, [isWindowClient, setWindowHeight]);

	return windowHeight;
}
