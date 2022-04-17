import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, PageHeader } from "../../components";
import { getUrl } from "../../store";
import { dateFormatter } from "../../utils";
import {
	StyledDatePicker,
	SummaryContainer,
	SummaryHighlightedCard,
	SummaryHighlightedCardsWrapper,
	SummaryHighlightedHeading,
	SummaryHighlightedInfo,
	SummaryMainCard,
} from "./SummaryElements";

export const Summary = () => {
	const [date, setDate] = useState(new Date());
	const [lowsPercentage, setLowsPercentage] = useState(Number);
	const [inRangePercentage, setInRangePercentage] = useState(Number);
	const [highsPercentage, setHighsPercentage] = useState(Number);
	const [isCardLoading, setIsCardLoading] = useState(true);

	const { nightscoutUrl } = useSelector(getUrl);
	const { timezone, getMonthStrings } = dateFormatter(date); // src/utils/dateFormatter.js
	const { monthString, monthStringAhead } = getMonthStrings();

	const nightscoutApiUrlForReadings = `${nightscoutUrl}api/v1/entries/sgv.json?find[dateString][$gte]=${monthString}T${timezone}:00:00&find[dateString][$lte]=${monthStringAhead}T${timezone}:00:00&count=10000`;
	const nightscoutApiUrlForInsulin = `${nightscoutUrl}api/v1/treatments?find[insulin][$gte]=0&find[created_at][$gte]=${monthString}T${timezone}:00:00&find[created_at][$lte]=${monthStringAhead}T${timezone}:00:00&count=10000`;

	const handleDateChange = date => {
		setDate(date);
	};

	useEffect(() => {
		const fetchAllReadings = async () => {
			setIsCardLoading(true);

			let allReadings = [];
			let lows = [];
			let inRange = [];
			let highs = [];

			await axios
				.get(nightscoutApiUrlForReadings)
				.then(response => {
					for (let i = 0; i < response?.data.length; i++)
						allReadings.push(response?.data[i]?.sgv);
				})
				.finally(() => {
					for (let i = 0; i < allReadings.length; i++) {
						if (allReadings[i] < 70) lows.push(allReadings[i]);
						else if (allReadings[i] > 180) highs.push(allReadings[i]);
						else inRange.push(allReadings[i]);
					}
				});

			setLowsPercentage(
				((lows.length * 100) / allReadings.length).toFixed(0)
			);
			setInRangePercentage(
				((inRange.length * 100) / allReadings.length).toFixed(0)
			);
			setHighsPercentage(
				((highs.length * 100) / allReadings.length).toFixed(0)
			);

			setIsCardLoading(false);
		};

		// const fetchAllInsulinTreatments = async () => {
		// 	setIsTableLoading(true);

		// 	let insulinGiven = 0;

		// 	await axios.get(nightscoutApiUrlForInsulin).then((response) => {
		// 		for (let treatmentNumber = 0; treatmentNumber < response?.data.length; treatmentNumber++)
		// 			insulinGiven += response?.data[treatmentNumber]?.insulin;
		// 	});

		// 	setMonthlyInsulin(insulinGiven);

		// 	setIsTableLoading(false);
		// };
		// fetchAllInsulinTreatments();

		fetchAllReadings();
	}, [date, nightscoutApiUrlForReadings, nightscoutApiUrlForInsulin]);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<SummaryContainer id="summary">
				<PageHeader heading="Relatório" />
				<SummaryMainCard>
					<StyledDatePicker
						format="y, MMMM"
						inputVariant="outlined"
						openTo="month"
						views={["year", "month"]}
						value={date}
						onChange={handleDateChange}
						autoOk
						minDate={new Date("2000-02-01")}
						disableFuture
					/>
					<SummaryHighlightedCardsWrapper>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>
								Baixas
							</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>
								{isCardLoading ? (
									<Loader size={46} noPadding />
								) : (
									`${lowsPercentage}%`
								)}
							</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>
								No alvo
							</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>
								{isCardLoading ? (
									<Loader size={46} noPadding />
								) : (
									`${inRangePercentage}%`
								)}
							</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
						<SummaryHighlightedCard>
							<SummaryHighlightedHeading>
								Altas
							</SummaryHighlightedHeading>
							<SummaryHighlightedInfo>
								{isCardLoading ? (
									<Loader size={46} noPadding />
								) : (
									`${highsPercentage}%`
								)}
							</SummaryHighlightedInfo>
						</SummaryHighlightedCard>
					</SummaryHighlightedCardsWrapper>
					{/* <SummaryTableContainer>
						{isTableLoading ? (
							// ? Loading section
							<Typography width={"100%"}>
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
							</Typography>
						) : (
							<>
								<SummaryTableColumn>
									<SummaryTableLine>
										<SummaryTableItem>
											Total de insulina
										</SummaryTableItem>
										<SummaryTableItem>
											{monthlyInsulin} u.i.
										</SummaryTableItem>
									</SummaryTableLine>
								</SummaryTableColumn>
							</>
						)}
					</SummaryTableContainer> */}
				</SummaryMainCard>
			</SummaryContainer>
		</MuiPickersUtilsProvider>
	);
};
