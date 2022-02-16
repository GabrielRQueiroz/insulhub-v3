import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { ReadingsContainer, ReadingsNotFound, ReadingsText } from './ReadingsElements';
import { dateFormatter } from '../../utils';

const directionsList = {
	DoubleUp: '⇈',
	SingleUp: '↑',
	FortyFiveUp: '↗',
	Flat: '→',
	FortyFiveDown: '↘',
	SingleDown: '↓',
	DoubleDown: '⇊',
};

export const Readings = ({ nightscoutBaseUrl, selectedTime }) => {
	const [reading, setReading] = useState(0);
	const [direction, setDirection] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const { getTimeStrings } = dateFormatter(selectedTime); // src/utils/formatDate.js

		const fetchSpecificReading = async () => {
			const { timeString, timeStringBefore, dateString, dateStringBefore } = getTimeStrings();

			const nightscoutApiUrl = `${nightscoutBaseUrl}api/v1/entries.json?find[dateString][$gte]=${dateStringBefore}T${timeStringBefore}:00Z&find[dateString][$lte]=${dateString}T${timeString}:59`;

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					setReading(response?.data[0]?.sgv || false);
					setDirection(directionsList[response?.data[0]?.direction]);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		fetchSpecificReading();
	}, [selectedTime]);

	return (
		<ReadingsContainer>
			{isLoading ? (
				<Loader size={10} margin={-10} />
			) : (
				<>
					{reading ? (
						<ReadingsText>
							{reading} {direction}
						</ReadingsText>
					) : (
						<ReadingsNotFound>Sem leituras :(</ReadingsNotFound>
					)}
				</>
			)}
		</ReadingsContainer>
	);
};
