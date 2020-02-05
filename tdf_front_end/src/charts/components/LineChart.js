import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';
import { rem2Px, setFont, setColor } from '../../styles';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
Chart.defaults.global.defaultFontFamily = setFont.main;
Chart.defaults.global.legend.display = true;
Chart.defaults.global.elements.line.tension = 0.1;

const LineChart = props => {
	const canvasRef = useRef(null);
	const lineChart = useRef(null);

	const { data, title, data1Label, data2Label, xAxisTitle } = props;
	const { dataLabels, data1, data2 = [] } = data;

	useEffect(
		() => {
			if (lineChart.current !== null) {
				lineChart.current.destroy();
			}
			const ctx = canvasRef.current.getContext('2d');
			lineChart.current = new Chart(ctx, {
				plugins: [ ChartDataLabels ],
				type: 'line',
				data: {
					labels: dataLabels,

					datasets: [
						{
							label: data1Label,
							data: data1,
							fill: false,
							borderColor: setColor.bkgndBlue,
							borderWidth: 2,
							pointRadius: 1,
							backgroundColor: setColor.chartYellow,
							datalabels: {
								display: false
							}
						},
						{
							label: data2Label,
							data: data2,
							fill: false,
							borderColor: setColor.noticeMeRed,
							borderWidth: 2,
							pointRadius: 1,
							backgroundColor: setColor.chartYellow,
							datalabels: {
								display: false
							}
						}
					]
				},
				options: {
					title: {
						display: true,
						fontSize: rem2Px(2.5),
						text: title
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					hover: {
						mode: 'nearest',
						intersect: true
					},
					layout: {
						padding: {
							left: 25,
							right: 25,
							bottom: 10
						}
					},
					animation: {
						duration: 250
					},
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						xAxes: [
							{
								ticks: { display: true },
								gridLines: {
									display: false,
									drawBorder: true
								},
								scaleLabel: {
									display: true,
									labelString: xAxisTitle
								}
							}
						],
						yAxes: [
							{
								ticks: { display: true },
								gridLines: {
									display: true,
									drawBorder: true
								}
							}
						]
					}
				}
			});
		},
		[ data1, data2, dataLabels, xAxisTitle, data1Label, data2Label, title ]
	);

	return (
		<DivWrapper fontSize={props.fontSize || '1em'}>
			{props.isLoading && <LoadingSpinner asOverlay />}
			<canvas id={props.id} ref={canvasRef} />
		</DivWrapper>
	);
};

export default LineChart;
const DivWrapper = styled.div`
	height: 60vh;
	background: #ffffe0;
	padding: 30px 20px 10px 20px;
	border-radius: 10px;
	-webkit-box-shadow: 0px 10px 0px -5px rgba(0, 0, 0, 0.3);
	-moz-box-shadow: 0px 10px 0px -5px rgba(0, 0, 0, 0.3);
	box-shadow: 0px 10px 0px -5px rgba(0, 0, 0, 0.3);
	& canvas {
		background-color: #ffffe0;
	}
`;
