import axios from 'axios';
import {
	ArcElement,
	BarController,
	BarElement,
	BubbleController,
	CategoryScale,
	Chart,
	Decimation,
	DoughnutController,
	Filler,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	LogarithmicScale,
	PieController,
	PointElement,
	PolarAreaController,
	RadarController,
	RadialLinearScale,
	ScatterController,
	TimeScale,
	TimeSeriesScale,
	Title,
	Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../components';
import { useWindowHeight } from '../../hooks/useWindowHeight';

Chart.register(
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip
);

export const Graph = ({ selectedDate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [bloodGlucose, setBloodGlucose] = useState({});
	const [labelData, setLabelData] = useState([]);
	const windowHeight = useWindowHeight(); // Created to re-render the graph when window height changes

	useEffect(() => {
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

		// Resetting all previous date values to the date picker props (here this order is important!)
		selectedDate.setYear(yearValue);
		selectedDate.setMonth(monthValue);
		selectedDate.setDate(dateValue);

		const fetchGraphInformation = async () => {
			const bloodGlucoseReadings = [];
			const graphLabels = [];

			const nightscoutApiUrl = `${process.env.REACT_APP_BABYBIA_HEROKU_URL}/api/v1/slice/entries/dateString/sgv/${dateString}/T*?find[dateString][$gte]=${dateString}T${timezone}:00:00.000&find[dateString][$lte]=${dateStringAhead}T${timezone}:00:00.000&count=300`;

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					for (let i = 0; i < response?.data?.length; i++) {
						let time = `${new Date(response?.data[i]?.dateString)}`;
						let labeledTime = time.slice(16, 21);

						graphLabels.push(labeledTime);
					}

					for (let i = 0; i < response?.data?.length; i++) {
						bloodGlucoseReadings.push(response?.data[i]?.sgv);
					}

					graphLabels.reverse();
					bloodGlucoseReadings.reverse();

					setLabelData(graphLabels);
					setBloodGlucose(bloodGlucoseReadings);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error(error);
				});
		};

		fetchGraphInformation();
	}, [selectedDate, windowHeight]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Line
					height={200}
					width={2000}
					data={{
						labels: labelData,
						datasets: [
							{
								label: 'BG readings',
								data: bloodGlucose,
								backgroundColor: ['rgba(55, 81, 255, 0.6)'],
								borderColor: ['rgba(55, 81, 255, 0.2)'],
							},
						],
					}}
					options={{
						responsive: true,

						pointRadius: 2.5,

						plugins: {
							legend: false,
						},

						scales: {
							x: {
								min: 0,
								bounds: 'ticks',
								display: true,
							},
							y: {
								max: 360,
								beginAtZero: true,
								ticks: {
									stepSize: 40,
								},
							},
						},
						maintainAspectRatio: false,
					}}
				/>
			)}
		</>
	);
};
