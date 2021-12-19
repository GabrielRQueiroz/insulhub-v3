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

export const Graph = () => {
	const [chartData, setChartData] = useState({});
	const [labelData, setLabelData] = useState([]);

	let fetchUrl = `https://babybia.herokuapp.com/api/v1/slice/entries/dateString/sgv/2021-12-18/T*?find[dateString][$gte]=2021-12-18T03:00:00.000&find[dateString][$lte]=2021-12-19T03:00:00.000&count=300`;

	const fetchData = () => {
		let dataArray = [];
		let labelsArray = [];

		axios
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

				console.log(labelsArray);

				setLabelData(labelsArray);
				setChartData(dataArray);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{/* <button type='button'>Mudar data</button> */}
			<Line
				width={2000}
				height={300}
				data={{
					labels: labelData,
					datasets: [
						{
							label: 'BG reading',
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
							max: 300,
							beginAtZero: true,
							ticks: {
								stepSize: 40,
							},
						},
					},
					maintainAspectRatio: false,
				}}
			/>
		</>
	);
};
