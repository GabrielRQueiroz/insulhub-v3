export const formatDate = (selectedDate) => {
	// Getting timezone
	const timezone = (selectedDate.getTimezoneOffset() / 60).toFixed(0).padStart(2, 0);

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

	return { timezone, dateString, dateStringAhead };
};
