import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import release1 from '../assets/images/assets/release1.png';
import release2 from '../assets/images/assets/release2.png';
import Card from '../components/Card';
import '../css/Release.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);
const data = {
	datasets: [
		{
			data: [10, 20, 30],
			backgroundColor: ['red', 'blue', 'yellow'],
		},
	],
	// These labels appear in the legend and in the tooltips when hovering different arcs
	labels: ['Red', 'Yellow', 'Blue'],
};
export default function Release() {
	const [data, setData] = useState({
		datasets: [
			{
				data: [15, 35, 15, 15, 20],
				backgroundColor: [
					'#FF5757',
					'#D91665',
					'#A2006F',
					'#62006D',
					'#000161',
				],
			},
		],
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			`Staking & Rewards ${'15%'}`,
			`Presale ${'35%'}`,
			`Development & Team ${'15%'}`,
			`Tresurey & ecosystem ${'15%'}`,
			`Ineqyuty ${'20%'}`,
		],
	});
	return (
		<div className='releases'>
			<div className='release orange'>
				<div className='content'>
					<h2 className='title'>About</h2>
					<p className='description'>
						We have released four limited edition NFTs early which can be bid on
						via <a href='#'>OpenSea</a>
					</p>
					<p className='description'>
						There will be the only four of these NFTs we ever make, so be sure
						not to miss out!
					</p>
					<p className='description'>50% of proceeds go to charity.</p>
					<a href='#' className='link'>
						Check them out <BsArrowRight />
					</a>
				</div>
				<div className='image'>
					<img src={release1} alt='release' />
					<div className='ellipse pink'></div>
				</div>
			</div>
			<div className='release green'>
				<div className='card-container'>
					<div className='App py-5' style={{ width: '50%', height: '100%' }}>
						<Doughnut data={data} />
					</div>
					<div className='ellipse orange'></div>
				</div>
				<div className='content'>
					<h2 className='title'> Release </h2>
					<ul>
						<li>
							<b> Staking & Rewards 15% </b>
						</li>
						<li>
							<b> Presale 35%</b>
						</li>
						<li>
							<b> Development & Team 15% </b>
						</li>
						<li>
							<b>Tresurey & ecosystem 15%</b>
						</li>
						<li>
							<b>Ineqyuty 20%</b>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
