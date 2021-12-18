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

	let fetchUrl = `https://babybia.herokuapp.com/api/v1/slice/entries/dateString/sgv/2021-12-18/T*:{00..04}:.*?find[dateString][$lte]=2021-12-19T03:05:00.000Z&find[dateString][$gte]=2021-12-18T03:00:00.000Z&count=24`;

	const fetchData = () => {
		let dataArray = [];

		axios
			.get(fetchUrl)
			.then((res) => {
				console.log(res.data);

				for (let i = 0; i < res.data.length; i++) {
					dataArray.push(res.data[i].sgv);
				}

				dataArray.reverse();

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
				height={400}
				data={{
					labels: [
						'00h',
						'01h',
						'02h',
						'03h',
						'04h',
						'05h',
						'06h',
						'07h',
						'08h',
						'09h',
						'10h',
						'11h',
						'12h',
						'13h',
						'14h',
						'15h',
						'16h',
						'17h',
						'18h',
						'19h',
						'20h',
						'21h',
						'22h',
						'23h',
					],
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

					scales: {
						x: {
							display: 'auto',
						},
						y: {
							max: 300,
							beginAtZero: true,
						},
					},
					maintainAspectRatio: false,
				}}
			/>
		</>
	);
};
