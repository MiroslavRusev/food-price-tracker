<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from '../components/chart.svelte';
	import DataRange from '../components/dataRange.svelte';
	import FoodItems from '../components/foodItems.svelte';
	import { getChartData, getFoodItems } from '$lib/dataFetcher';
	import type { FoodItem, ChartData } from '$lib/interfaces';

	let loading = true;
	let error = false;
	let foodItems: FoodItem[] = [];
	
	const defaults = {
		range: '3months',
		foods: ['bread']
	};
	
	let selectedRange = defaults.range;
	let selectedFoods = defaults.foods;
	let chartData: ChartData = { labels: [], datasets: [] };
	
	onMount(async () => {
		try {
			loading = true;
			// Load food items first
			foodItems = await getFoodItems();
			
			// Set default selection to first available food if bread is not available
			if (foodItems.length > 0 && !foodItems.find(f => f.id === 'bread')) {
				selectedFoods = [foodItems[0].id];
			}
			
			// Load initial chart data
			chartData = await getChartData(selectedRange, selectedFoods);
		} catch (err) {
			console.error('Error loading data:', err);
			error = true;
		} finally {
			loading = false;
		}
	});
	
	// Reactive statement to update chart data when selections change
	$: if (!loading && foodItems.length > 0) {
		selectedRange, selectedFoods; // Explicitly reference the variables to watch
		updateChartData();
	}
	
	async function updateChartData() {
		try {
			chartData = await getChartData(selectedRange, selectedFoods);
		} catch (err) {
			console.error('Error updating chart data:', err);
			error = true;
		}
	}
	
	function resetToDefaults() {
		if (selectedRange !== defaults.range || selectedFoods !== defaults.foods) {
			selectedRange = defaults.range;
			selectedFoods = defaults.foods;
		} 
	}

</script>

<header class="flex items-center justify-between py-4 border-b bg-stone-300 mb-8">
	<div class="flex-1"></div>
	<h1 class="text-3xl font-bold text-center">Welcome to Food Price Tracker</h1>
	<div class="flex-1 flex justify-end pr-2">
		<a id="fb-social-button" aria-label="Facebook" target="_blank" href="https://www.facebook.com/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="20"
				height="20"
				viewBox="0 0 50 50"
			>
				<path
					d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"
				></path>
			</svg>
		</a>
	</div>
</header>

{#if loading}
	<section class="mx-auto max-w-5xl text-center mb-8">
		<div class="h-72 bg-blue-50 rounded-lg flex items-center justify-center">
			<div class="text-gray-600">
				<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
				<p>Loading food price data...</p>
			</div>
		</div>
	</section>
{:else if error}
	<section class="mx-auto max-w-5xl text-center mb-8">
		<div class="h-72 bg-red-50 rounded-lg flex items-center justify-center">
			<div class="text-red-600">
				<p class="text-lg font-semibold mb-2">Error loading data</p>
				<p>Please try refreshing the page</p>
			</div>
		</div>
	</section>
{:else}
	<section class="mx-auto max-w-5xl text-center mb-8">
		<h2 class="text-xl font-semibold mb-4">Food Prices Over Time</h2>
		<div
			id="chart"
			class="h-72 bg-blue-50 rounded-lg flex items-center justify-center text-gray-400 text-lg mb-8"
		>
			<Chart data={chartData} />
		</div>
	</section>

	<DataRange bind:selectedRange />
	<FoodItems {foodItems} bind:selectedFoods />

	<div class="flex justify-center">
		<button 
			class="bg-pink-500 text-white p-4 border-2 m-4 rounded-lg shadow-lg hover:bg-pink-600 transition-colors"
			on:click={resetToDefaults}
		>
			Reset to Defaults
		</button>
	</div>
{/if}
