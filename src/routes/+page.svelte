<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from '../components/chart.svelte';
	import DataRange from '../components/dataRange.svelte';
	import FoodItems from '../components/foodItems.svelte';
	import { selectedFoods, foodStore } from '$lib/stores';
	import { getChartData, getFoodItems } from '$lib/dataFetcher';
	import type { FoodItem, ChartData } from '$lib/interfaces';
	import HeaderImage from "$lib/assets/header-image.webp";
	import Form from '../components/Form.svelte';

	let loading = true;
	let error = false;
	let foodItems: FoodItem[] = [];
	
	const defaults = {
		range: '3months',
		foods: ['bread']
	};
	
	let selectedRange = defaults.range;
	let chartData: ChartData = { labels: [], datasets: [] };
	
	onMount(async () => {
		try {
			loading = true;
			// Load food items first
			foodItems = await getFoodItems();
			
			// Set default selection to first available food if bread is not available
			if (foodItems.length > 0 && !foodItems.find(f => f.id === 'bread')) {
				foodStore.set([foodItems[0].id]);
			} else {
				foodStore.set(defaults.foods);
			}
			
			// Load initial chart data
			chartData = await getChartData(selectedRange, $selectedFoods);
		} catch (err) {
			console.error('Error loading data:', err);
			error = true;
		} finally {
			loading = false;
		}
	});
	
	// Reactive statement to update chart data when selections change
	$: if (!loading && foodItems.length > 0) {
		selectedRange, $selectedFoods; // Watch the store value, not the store object
		updateChartData();
	}
	
	async function updateChartData() {
		try {
			chartData = await getChartData(selectedRange, $selectedFoods);
		} catch (err) {
			console.error('Error updating chart data:', err);
			error = true;
		}
	}
	
	function resetToDefaults() {
		if (selectedRange !== defaults.range || $selectedFoods.length !== defaults.foods.length || !defaults.foods.every(f => $selectedFoods.includes(f))) {
			selectedRange = defaults.range;
			foodStore.set(defaults.foods);
		} 
	}

</script>

<main class="main-content flex-1 pb-8 min-h-screen">
	<!-- Hero Section with Background Image -->
	<div class="overlay-image relative" style="background-image: url({HeaderImage}); background-size: cover; background-position: center;">
		<div class="max-w-6xl mx-auto chart-container">
			{#if loading}
				<div class="flex items-center justify-center min-h-[400px]">
					<div class="text-center">
						<div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mb-4"></div>
						<p class="text-gray-600 font-medium">Loading food price data...</p>
					</div>
				</div>
			{:else if error}
				<div class="flex items-center justify-center min-h-[400px]">
					<div class="text-center">
						<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Error loading data</h3>
						<p class="text-gray-600">Please try refreshing the page</p>
					</div>
				</div>
			{:else}
				<!-- Chart Section -->
				<div class="p-8 mb-12">
					<div class="text-center mb-8">
						<h1 class="text-3xl font-bold text-white mb-2">Хармонизиран индекс на потребителски цени</h1>
						<p class="text-white text-lg">Index (базов) 2015=100</p>
					</div>
					
					<div class="bg-gray-50 rounded-xl border border-gray-200 p-6 min-h-[300px] flex items-center justify-center">
						<Chart data={chartData} />
					</div>
				</div>
			{/if}
		</div>
		
		<!-- Controls Section - Overlapping with the overlay -->
		{#if !loading && !error}
			<div class="controls-overlap">
				<div class="max-w-6xl mx-auto px-6 space-y-8">
					<DataRange bind:selectedRange />
					<FoodItems {foodItems} />
					
					<div class="flex justify-center pt-4 pb-8">
						<button 
							class="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							on:click={resetToDefaults}
						>
							<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
							</svg>
							Изчисти селекцията
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="max-w-3xl mx-auto px-6">
		<Form data={chartData}/>
	</div>
	
</main>