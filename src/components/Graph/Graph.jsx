import axios from 'axios';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../components';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { dateFormatter } from '../../utils';

Chart.register(zoomPlugin);

export const Graph = ({ selectedDate, nightscoutUrl }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [bloodGlucose, setBloodGlucose] = useState({});
	const [labelData, setLabelData] = useState([]);
	const [graphYLimit, setGraphYLimit] = useState(240);
	const windowHeight = useWindowHeight(); // Created to re-render the graph when window height changes

	const { timezone, getDateStrings } = dateFormatter(selectedDate); // src/utils/formatDate.js
	const { dateString, dateStringAhead } = getDateStrings();

	const nightscoutApiUrl = `${nightscoutUrl}api/v1/entries/sgv.json?find[dateString][$gte]=${dateString}T${timezone}:00:00.00&find[dateString][$lte]=${dateStringAhead}T${timezone}:00:00.00&count=400`;

	useEffect(() => {
		const fetchGraphInformation = async () => {
			const bloodGlucoseReadings = [];
			const graphLabels = [];

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					for (let i = response?.data?.length - 1; i >= 0; i--) {
						response?.data[i]?.noise === 1 && bloodGlucoseReadings.push(response?.data[i]?.sgv);
					}

					for (let i = bloodGlucoseReadings.length - 1; i >= 0; i--) {
						let time = `${new Date(response?.data[i]?.dateString)}`;

						graphLabels.push(time.slice(16, 21)); // ? only hh:mm sliced
					}

					// ? Finding highest reading to set the max Y axis value on the graph
					let highestBGValue = Math.max(...bloodGlucoseReadings);

					if (highestBGValue > 200) {
						// Rounding it to a 10 multiple
						highestBGValue = Math.ceil((highestBGValue + 50) / 10) * 10;
						// Setting new value as the Y axis limit
						setGraphYLimit(highestBGValue);
					}

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
	}, [nightscoutApiUrl, selectedDate, windowHeight]);

	return (
		<>
			{isLoading ? (
				<Loader size={60} />
			) : (
				<Line
					height={200}
					width={2000}
					data={{
						labels: labelData,
						datasets: [
							{
								label: 'Glicemia',
								data: bloodGlucose,
								backgroundColor: ['rgba(55, 81, 255, 0.6)'],
								borderColor: ['rgba(55, 81, 255, 0.2)'],
							},
						],
					}}
					options={{
						responsive: true,

						pointRadius: 3.5,

						scales: {
							x: {
								bounds: 'ticks',
								display: true,
							},
							y: {
								max: graphYLimit,
								beginAtZero: true,
								ticks: {
									stepSize: 40,
								},
							},
						},

						maintainAspectRatio: false,

						plugins: {
							legend: false,
							zoom: {
								limits: {
									x: { minRange: 25 },
								},
								pan: {
									enabled: true,
									mode: 'x',
								},
								zoom: {
									wheel: {
										enabled: true,
										speed: 0.075,
									},
									pinch: {
										enabled: true,
									},
									mode: 'x',
								},
							},
						},
					}}
				/>
			)}
		</>
	);
};
