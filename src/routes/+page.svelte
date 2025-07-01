<script lang="ts">
	import Chart from '../components/chart.svelte';
	import DataRange from '../components/dataRange.svelte';
	import FoodItems from '../components/foodItems.svelte';
	import { getChartData } from '$lib/data';
	
	const defaults = {
		range: '30days',
		foods: ['flour']
	};
	
	let selectedRange = defaults.range;
	let selectedFoods = defaults.foods;
	
	$: chartData = getChartData(selectedRange, selectedFoods);
	
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

<section class="mx-auto max-w-5xl text-center mb-8">
	<h2 class="text-xl font-semibold mb-4">Food Prices Over Time</h2>
	<!-- Chart placeholder -->
	<div
		id="chart"
		class="h-72 bg-blue-50 rounded-lg flex items-center justify-center text-gray-400 text-lg mb-8"
	>
		<Chart data={chartData} />
	</div>
</section>

<DataRange bind:selectedRange />
<FoodItems bind:selectedFoods />

<div class="flex justify-center">
	<button 
		class="bg-pink-500 text-white p-4 border-2 m-4 rounded-lg shadow-lg hover:bg-pink-600 transition-colors"
		on:click={resetToDefaults}
	>
		Reset to Defaults
	</button>
</div>
