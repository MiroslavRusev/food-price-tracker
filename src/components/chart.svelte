<script lang="ts">
	// @ts-nocheck
	import { Line } from 'svelte5-chartjs';
	import type { ChartData } from '$lib/foodDataFetcher';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let data: ChartData = {
		labels: [],
		datasets: []
	};
</script>

<div class="w-full h-full">
	<Line
		{data}
		width={500}
		height={300}
		options={{
			maintainAspectRatio: false,
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
					labels: {
						usePointStyle: true,
						padding: 20,
						font: {
							size: 12,
							weight: '500'
						}
					}
				},
				tooltip: {
					backgroundColor: 'rgba(255, 255, 255, 0.95)',
					titleColor: '#374151',
					bodyColor: '#374151',
					borderColor: '#E5E7EB',
					borderWidth: 1,
					cornerRadius: 8,
					displayColors: true,
					padding: 12
				}
			},
			scales: {
				x: {
					grid: {
						color: '#F3F4F6',
						drawBorder: false
					},
					ticks: {
						color: '#6B7280',
						font: {
							size: 11
						}
					}
				},
				y: {
					grid: {
						color: '#F3F4F6',
						drawBorder: false
					},
					ticks: {
						color: '#6B7280',
						font: {
							size: 11
						}
					}
				}
			}
		}}
	/>
</div>
