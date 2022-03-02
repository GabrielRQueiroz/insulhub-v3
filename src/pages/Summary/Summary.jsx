import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader, PageHeader } from '../../components';
import { getUrl } from '../../store';
import { dateFormatter } from '../../utils';
import {
	StyledDatePicker,
	SummaryContainer,
	SummaryHighlightedCard,
	SummaryHighlightedCardsWrapper,
	SummaryHighlightedHeading,
	SummaryHighlightedInfo,
	SummaryMainCard,
	SummaryTableContainer,
} from './SummaryElements';

export const Summary = () => {
	const [date, setDate] = useState(new Date());
	const [lowsPercentage, setLowsPercentage] = useState(Number);
	const [inRangePercentage, setInRangePercentage] = useState(Number);
	const [highsPercentage, setHighsPercentage] = useState(Number);
	const [isLoading, setIsLoading] = useState(false);

	const { nightscoutUrl } = useSelector(getUrl);
	const { timezone, getMonthStrings } = dateFormatter(date); // src/utils/dateFormatter.js
	const { monthString, monthStringAhead } = getMonthStrings();

	const nightscoutApiUrlForHighs = `${nightscoutUrl}api/v1/entries/sgv.json?find[sgv][$gte]=170&find[dateString][$gte]=${monthString}T${timezone}:00:000&find[dateString][$lte]=${monthStringAhead}T${timezone}:00:000&count=10000`;
	const nightscoutApiUrlForLows = `${nightscoutUrl}api/v1/entries/sgv.json?find[sgv][$lte]=70&find[dateString][$gte]=${monthString}T${timezone}:00:000&find[dateString][$lte]=${monthStringAhead}T${timezone}:00:000&count=10000`;
	const nightscoutApiUrlForInRange = `${nightscoutUrl}api/v1/entries/sgv.json?find[sgv][$lte]=170&find[sgv][$gte]=70&find[dateString][$gte]=${monthString}T${timezone}:00:000&find[dateString][$lte]=${monthStringAhead}T${timezone}:00:000&count=10000`;

	const handleDateChange = (date) => {
		setDate(date);
	};

	useEffect(() => {
		const fetchAllInformation = async () => {
			setIsLoading(true);

			let lowsNumber;
			let inRangeNumber;
			let highsNumber;

			await axios.get(nightscoutApiUrlForLows).then((response) => (lowsNumber = response?.data?.length));
			await axios.get(nightscoutApiUrlForInRange).then((response) => (inRangeNumber = response?.data?.length));
			await axios.get(nightscoutApiUrlForHighs).then((response) => (highsNumber = response?.data?.length));

			const totalNumberOfReadings = lowsNumber + inRangeNumber + highsNumber;

			setLowsPercentage(((lowsNumber * 100) / totalNumberOfReadings).toFixed(0));
			setInRangePercentage(((inRangeNumber * 100) / totalNumberOfReadings).toFixed(0));
			setHighsPercentage(((highsNumber * 100) / totalNumberOfReadings).toFixed(0));

			console.log(totalNumberOfReadings, lowsNumber, inRangeNumber, highsNumber, monthString, monthStringAhead);

			setIsLoading(false);
		};

		fetchAllInformation();
	}, [date, nightscoutApiUrlForHighs, nightscoutApiUrlForInRange, nightscoutApiUrlForLows]);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<SummaryContainer>
				<PageHeader heading='Relatório' />
				<SummaryMainCard>
					<StyledDatePicker
						format='y, MMMM'
						inputVariant='outlined'
						openTo='month'
						views={['year', 'month']}
						value={date}
						onChange={handleDateChange}
						autoOk
						minDate={new Date('2000-02-01')}
						disableFuture
					/>
					<SummaryHighlightedCardsWrapper>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>Baixas</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>{isLoading ? <Loader noPadding /> : `${lowsPercentage}%`}</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>No alvo</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>{isLoading ? <Loader noPadding /> : `${inRangePercentage}%`}</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>Altas</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>{isLoading ? <Loader noPadding /> : `${highsPercentage}%`}</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
					</SummaryHighlightedCardsWrapper>
					<SummaryTableContainer>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod enim neque nisi, voluptatibus aperiam unde expedita rerum porro non,
						voluptate pariatur necessitatibus? Nam, laboriosam commodi voluptas sit inventore vitae modi.
					</SummaryTableContainer>
				</SummaryMainCard>
			</SummaryContainer>
		</MuiPickersUtilsProvider>
	);
};
