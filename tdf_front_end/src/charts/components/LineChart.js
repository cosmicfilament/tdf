import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';
import { rem2Px, setFont } from '../../styles';

Chart.defaults.global.legend.display = true;
Chart.defaults.global.elements.line.tension = 0.1;

const LineChart = props => {
	const canvasRef = useRef(null);
	const lineChart = useRef(null);

	useEffect(
		() => {
			const { dataLabels, data1, data2 } = props.data;
			if (lineChart.current !== null) {
				lineChart.current.destroy();
			}
			const ctx = canvasRef.current.getContext('2d');
			lineChart.current = new Chart(ctx, {
				type: 'line',
				data: {
					//Bring in data
					labels: dataLabels,

					datasets: [
						{
							label: props.data1Label,
							data: data1,
							fill: false,
							borderColor: 'blue',
							borderWidth: 2,
							pointRadius: 0
						},
						{
							label: props.data2Label,
							data: data2,
							fill: false,
							borderColor: 'red',
							borderWidth: 2,
							pointRadius: 0,
							backgroundColor: '#ffffca'
						}
					]
				},
				options: {
					title: {
						display: true,
						fontFamily: setFont.third,
						fontSize: rem2Px(2),
						text: props.title
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

			// let gradientLine = chartRef.createLinearGradient(0, 0, 0, graphHeight);
			// gradientLine.addColorStop(0, 'rgb(255, 0, 110, 0.2)');
			// gradientLine.addColorStop(0.5, 'rgb(255, 0, 110, 0.35)');
			// gradientLine.addColorStop(1, 'rgb(255, 0, 110, 0.7)');
		},
		[
			props.id,
			props.data,
			props.data1Label,
			props.data2Label,
			props.title
		]
	);

	return (
		<DivWrapper>
			<canvas id={props.id} ref={canvasRef} />
		</DivWrapper>
	);
};

export default LineChart;

const DivWrapper = styled.div`
	width: 75vw;
	height: 35vh;
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
