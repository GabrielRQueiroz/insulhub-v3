import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { ReadingsContainer } from './ReadingsElements';

const directionsList = {
	DoubleUp: '⇈',
	SingleUp: '↑',
	FortyFiveUp: '↗',
	Flat: '→',
	FortyFiveDown: '↘',
	SingleDown: '↓',
	DoubleDown: '⇊',
};

export const Readings = ({ selectedDate, selectedTime }) => {
	const [reading, setReading] = useState(0);
	const [direction, setDirection] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const timezone = selectedTime.getTimezoneOffset() / 60;

		// ! Storing previous date values to avoid the date picker properties changing to unwanted date
		const dateValue = selectedTime.getDate();
		const monthValue = selectedTime.getMonth();
		const yearValue = selectedTime.getFullYear();
		/* -=-=-=-=-=-=-=-=-=-=-=-=-=- */
		const hoursValue = selectedTime.getHours();
		const minutesValue = selectedTime.getMinutes();

		// Applying timezone value
		selectedTime.setHours(hoursValue + timezone);

		const hoursWithTimezone = selectedTime.getHours();

		const dateValueWithTimezone = selectedTime.getDate();
		const monthValueWithTimezone = selectedTime.getMonth();
		const yearValueWithTimezone = selectedTime.getFullYear();

		const timeString = `${hoursWithTimezone.toString().padStart(2, 0)}:${minutesValue.toString().padStart(2, 0)}`;

		const dateString = `${yearValueWithTimezone}-${(monthValueWithTimezone + 1).toString().padStart(2, 0)}-${dateValueWithTimezone
			.toString()
			.padStart(2, 0)}`;

		// Setting five minutes before for the 'timeStringAhead' variable
		selectedTime.setMinutes(minutesValue - 10);
		const backedHoursValue = selectedTime.getHours();
		const backedMinutesValue = selectedTime.getMinutes();

		const dateAfterMinutesUpdate = selectedTime.getDate();
		const monthAfterMinuteUpdate = selectedTime.getMonth();
		const yearAfterMinuteUpdate = selectedTime.getFullYear();

		const timeStringBefore = `${backedHoursValue.toString().padStart(2, 0)}:${backedMinutesValue.toString().padStart(2, 0)}`;

		const dateStringBefore = `${yearAfterMinuteUpdate}-${(monthAfterMinuteUpdate + 1).toString().padStart(2, 0)}-${dateAfterMinutesUpdate
			.toString()
			.padStart(2, 0)}`;
		// ? padStart is to avoid left zero deletion, eg. '04' turning into '4'

		// Resetting all previous time values to the time picker props (here this order is important!)
		selectedTime.setYear(yearValue);
		selectedTime.setMonth(monthValue);
		selectedTime.setDate(dateValue);
		selectedTime.setMinutes(minutesValue);
		selectedTime.setHours(hoursValue);

		const fetchSpecificReading = async () => {
			const nightscoutApiUrl = `${process.env.REACT_APP_BABYBIA_HEROKU_URL}/api/v1/entries/sgv.json?find[dateString][$gte]=${dateStringBefore}T${timeStringBefore}:00Z&find[dateString][$lte]=${dateString}T${timeString}:59`;

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					setReading(response?.data[0]?.sgv || 'Nenhuma leitura encontrada');
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
				<span>
					{reading} {direction}
				</span>
			)}
		</ReadingsContainer>
	);
};
