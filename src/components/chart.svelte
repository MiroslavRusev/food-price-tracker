<script lang="ts">
	// @ts-nocheck
	import { Line } from 'svelte5-chartjs';
	import type { ChartData } from '$lib/data';

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

<Line {data} width={500} height={500} options={{ maintainAspectRatio: false }} />
