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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../components';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { dateFormatter } from '../../utils';

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

export const Graph = ({ nightscoutBaseUrl, selectedDate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [bloodGlucose, setBloodGlucose] = useState({});
	const [labelData, setLabelData] = useState([]);
	const windowHeight = useWindowHeight(); // Created to re-render the graph when window height changes

	useEffect(() => {
		const { timezone, getDateStrings } = dateFormatter(selectedDate); // src/utils/formatDate.js

		const fetchGraphInformation = async () => {
			const bloodGlucoseReadings = [];
			const graphLabels = [];

			const { dateString, dateStringAhead } = getDateStrings();

			const nightscoutApiUrl = `${nightscoutBaseUrl}api/v1/entries.json?find[dateString][$gte]=${dateString}T${timezone}:00:00.000&find[dateString][$lte]=${dateStringAhead}T${timezone}:00:00.000&count=300`;

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

		window.addEventListener('focus', fetchGraphInformation);

		return window.removeEventListener('focus', fetchGraphInformation);
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
