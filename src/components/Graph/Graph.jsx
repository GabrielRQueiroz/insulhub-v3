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
import 'react-loading-skeleton/dist/skeleton.css';
import { Loader } from '../../components';

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

	useEffect(() => {
		const timeString = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
			.toString()
			.padStart(2, 0)}-${selectedDate.getDate().toString().padStart(2, 0)}`;
		//padStart is to avoid '04' turning into only '4'

		const timeStringAhead = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
			.toString()
			.padStart(2, 0)}-${(selectedDate.getDate() + 1).toString().padStart(2, 0)}`;

		const fetchGraphInformation = async () => {
			const bloodGlucoseReadings = [];
			const graphLabels = [];

			const nightscoutApiUrl = `${process.env.REACT_APP_BABYBIA_HEROKU_URL}/api/v1/slice/entries/dateString/sgv/${timeString}/T*?find[dateString][$gte]=${timeString}T03:00:00.000&find[dateString][$lte]=${timeStringAhead}T03:00:00.000&count=300`;

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					for (let i = 0; i < response.data.length; i++) {
						let time = `${new Date(response.data[i].dateString)}`;
						let labeledTime = time.slice(16, 21);

						graphLabels.push(labeledTime);
					}

					for (let i = 0; i < response.data.length; i++) {
						bloodGlucoseReadings.push(response.data[i].sgv);
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
	}, [selectedDate]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Line
					title="Blood glucose readings' graph"
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
