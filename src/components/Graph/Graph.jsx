import axios from 'axios';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../components';
import { useWindowHeight } from '../../hooks/useWindowHeight';
import { dateFormatter } from '../../utils';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

export const Graph = ({ nightscoutBaseUrl, selectedDate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [bloodGlucose, setBloodGlucose] = useState({});
	const [labelData, setLabelData] = useState([]);
	const [graphYLimit, setGraphYLimit] = useState(240);
	const windowHeight = useWindowHeight(); // Created to re-render the graph when window height changes

	useEffect(() => {
		const { timezone, getDateStrings } = dateFormatter(selectedDate); // src/utils/formatDate.js

		const fetchGraphInformation = async () => {
			const bloodGlucoseReadings = [];
			const graphLabels = [];

			const { dateString, dateStringAhead } = getDateStrings();

			const nightscoutApiUrl = `${nightscoutBaseUrl}api/v1/entries/sgv.json?find[dateString][$gte]=${dateString}T${timezone}:00:00.000&find[dateString][$lte]=${dateStringAhead}T${timezone}:00:00.000&count=400`;

			setIsLoading(true);

			await axios
				.get(nightscoutApiUrl)
				.then((response) => {
					for (let i = 0; i < response?.data?.length; i++) {
						response?.data[i]?.noise === 1 && bloodGlucoseReadings.push(response?.data[i]?.sgv);
					}

					for (let i = 0; i < bloodGlucoseReadings.length; i++) {
						let time = `${new Date(response?.data[i]?.dateString)}`;
						let labeledTime = time.slice(16, 21);

						graphLabels.push(labeledTime);
					}

					// Arrays needed to be reverted in order to keep readings' chronological order
					graphLabels.reverse();
					bloodGlucoseReadings.reverse();

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
	}, [selectedDate, windowHeight, nightscoutBaseUrl]);

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

						pointRadius: 2.5,

						plugins: {
							legend: false,
							zoom: {
								pan: {
									enabled: true,
									mode: 'x',
								},
								zoom: {
									wheel: {
										enabled: true,
									},
									pinch: {
										enabled: true,
									},
									mode: 'x',
								},
							},
						},

						scales: {
							x: {
								min: 0,
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
					}}
				/>
			)}
		</>
	);
};
