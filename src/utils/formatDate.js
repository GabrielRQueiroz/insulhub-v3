export const dateFormatter = (selectedDate) => {
	// Getting timezone as a string
	const timezone = (selectedDate.getTimezoneOffset() / 60).toFixed(0).padStart(2, 0);

	const getDateStrings = () => {
		// ! Storing previous date values to avoid the date picker properties changing to unwanted date
		const dateValue = selectedDate.getDate();
		const monthValue = selectedDate.getMonth();
		const yearValue = selectedDate.getFullYear();

		const dateString = `${yearValue}-${(monthValue + 1).toString().padStart(2, 0)}-${dateValue.toString().padStart(2, 0)}`;
		// ? padStart is to avoid left zero deletion, eg. '04' turning into '4'

		// Setting one day ahead for the 'dateStringAhead' variable
		selectedDate.setDate(dateValue + 1);
		const forwardedDateValue = selectedDate.getDate();
		const forwardedMonthValue = selectedDate.getMonth();
		const forwardedYearValue = selectedDate.getFullYear();

		const dateStringAhead = `${forwardedYearValue}-${(forwardedMonthValue + 1).toString().padStart(2, 0)}-${forwardedDateValue
			.toString()
			.padStart(2, 0)}`;

		// Resetting all previous date values to the previous selectedDate value (here this order is important!)
		selectedDate.setYear(yearValue);
		selectedDate.setMonth(monthValue);
		selectedDate.setDate(dateValue);

		return { dateString, dateStringAhead };
	};

	const getTimeStrings = () => {
		// ! Storing previous date values to avoid the date picker properties changing to unwanted date
		const dateValue = selectedDate.getDate();
		const monthValue = selectedDate.getMonth();
		const yearValue = selectedDate.getFullYear();
		/* -=-=-=-=-=-=-=-=-=-=-=-=-=- */
		const hoursValue = selectedDate.getHours();
		const minutesValue = selectedDate.getMinutes();

		// Applying timezone value
		selectedDate.setHours(hoursValue + parseInt(timezone));

		const hoursWithTimezone = selectedDate.getHours();

		const dateValueWithTimezone = selectedDate.getDate();
		const monthValueWithTimezone = selectedDate.getMonth();
		const yearValueWithTimezone = selectedDate.getFullYear();

		const timeString = `${hoursWithTimezone.toString().padStart(2, 0)}:${minutesValue.toString().padStart(2, 0)}`;

		const dateString = `${yearValueWithTimezone}-${(monthValueWithTimezone + 1).toString().padStart(2, 0)}-${dateValueWithTimezone
			.toString()
			.padStart(2, 0)}`;

		// Setting ten minutes before for the 'timeStringAhead' variable
		selectedDate.setMinutes(minutesValue - 10);
		const backedHoursValue = selectedDate.getHours();
		const backedMinutesValue = selectedDate.getMinutes();

		const dateAfterMinutesUpdate = selectedDate.getDate();
		const monthAfterMinuteUpdate = selectedDate.getMonth();
		const yearAfterMinuteUpdate = selectedDate.getFullYear();

		const timeStringBefore = `${backedHoursValue.toString().padStart(2, 0)}:${backedMinutesValue.toString().padStart(2, 0)}`;

		const dateStringBefore = `${yearAfterMinuteUpdate}-${(monthAfterMinuteUpdate + 1).toString().padStart(2, 0)}-${dateAfterMinutesUpdate
			.toString()
			.padStart(2, 0)}`;
		// ? padStart is to avoid left zero deletion, eg. '04' turning into '4'

		// Resetting all previous time values to the time picker props (here this order is important!)
		selectedDate.setYear(yearValue);
		selectedDate.setMonth(monthValue);
		selectedDate.setDate(dateValue);
		selectedDate.setMinutes(minutesValue);
		selectedDate.setHours(hoursValue);

		return { timeString, timeStringBefore, dateString, dateStringBefore };
	};

	return { timezone, getDateStrings, getTimeStrings };
};
