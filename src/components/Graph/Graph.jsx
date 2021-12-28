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

export const Graph = ({ time }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [chartData, setChartData] = useState({});
	const [labelData, setLabelData] = useState([]);

	const timeString = `${time.getFullYear()}-${(time.getMonth() + 1)
		.toString()
		.padStart(2, 0)}-${time.getDate().toString().padStart(2, 0)}`;
	//padStart is to avoid '04' turning into only '4'
	const timeStringAhead = `${time.getFullYear()}-${(time.getMonth() + 1)
		.toString()
		.padStart(2, 0)}-${(time.getDate() + 1).toString().padStart(2, 0)}`;

	const fetchData = async () => {
		const dataArray = [];
		const labelsArray = [];

		const fetchUrl = `${process.env.REACT_APP_BABYBIA_HEROKU_URL}/api/v1/slice/entries/dateString/sgv/${timeString}/T*?find[dateString][$gte]=${timeString}T03:00:00.000&find[dateString][$lte]=${timeStringAhead}T03:00:00.000&count=300`;

		setIsLoading(true);

		await axios
			.get(fetchUrl)
			.then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					let time = `${new Date(res.data[i].dateString)}`;
					let labeledTime = time.slice(16, 21);

					labelsArray.push(labeledTime);
				}

				for (let i = 0; i < res.data.length; i++) {
					dataArray.push(res.data[i].sgv);
				}

				labelsArray.reverse();
				dataArray.reverse();

				setLabelData(labelsArray);
				setChartData(dataArray);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, [time]);

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
								data: chartData,
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
